import { NextResponse, type NextRequest } from "next/server";
import {
  LINE_STATE_COOKIE,
  LINE_TOKEN_URL,
  LINE_VERIFY_URL,
  lineConfig,
  redirectUri,
} from "@/lib/line";
import { SESSION_COOKIE, SESSION_MAX_AGE, encodeSession } from "@/lib/session";

function fail(req: NextRequest, reason: string) {
  const res = NextResponse.redirect(
    new URL(`/login?error=${encodeURIComponent(reason)}`, req.url),
  );
  res.cookies.delete({ name: LINE_STATE_COOKIE, path: "/api/auth/line" });
  return res;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  if (params.get("error")) return fail(req, params.get("error")!);

  let saved: { state: string; nonce: string; verifier: string };
  try {
    saved = JSON.parse(req.cookies.get(LINE_STATE_COOKIE)?.value ?? "");
  } catch {
    return fail(req, "expired");
  }

  const code = params.get("code");
  if (!code || params.get("state") !== saved.state) {
    return fail(req, "invalid_state");
  }

  const { channelId, channelSecret } = lineConfig();

  const tokenRes = await fetch(LINE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri(req),
      client_id: channelId,
      client_secret: channelSecret,
      code_verifier: saved.verifier,
    }),
  });
  if (!tokenRes.ok) return fail(req, "token_exchange_failed");
  const { id_token } = (await tokenRes.json()) as { id_token?: string };
  if (!id_token) return fail(req, "missing_id_token");

  // LINE verifies signature, audience, expiry and nonce for us.
  const verifyRes = await fetch(LINE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      id_token,
      client_id: channelId,
      nonce: saved.nonce,
    }),
  });
  if (!verifyRes.ok) return fail(req, "id_token_invalid");
  const profile = (await verifyRes.json()) as {
    sub: string;
    name?: string;
    picture?: string;
  };

  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.delete({ name: LINE_STATE_COOKIE, path: "/api/auth/line" });
  res.cookies.set(
    SESSION_COOKIE,
    encodeSession({
      id: profile.sub,
      name: profile.name ?? "LINE user",
      picture: profile.picture,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    },
  );
  return res;
}
