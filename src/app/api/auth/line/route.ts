import { createHash, randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import {
  LINE_AUTHORIZE_URL,
  LINE_STATE_COOKIE,
  lineConfig,
  redirectUri,
} from "@/lib/line";

export async function GET(req: NextRequest) {
  const { channelId } = lineConfig();
  const state = randomBytes(16).toString("base64url");
  const nonce = randomBytes(16).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");

  const url = new URL(LINE_AUTHORIZE_URL);
  url.search = new URLSearchParams({
    response_type: "code",
    client_id: channelId,
    redirect_uri: redirectUri(req),
    state,
    nonce,
    scope: "profile openid",
    code_challenge: challenge,
    code_challenge_method: "S256",
  }).toString();

  const res = NextResponse.redirect(url);
  res.cookies.set(
    LINE_STATE_COOKIE,
    JSON.stringify({ state, nonce, verifier }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/line",
      maxAge: 60 * 10,
    },
  );
  return res;
}
