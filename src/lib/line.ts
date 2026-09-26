import type { NextRequest } from "next/server";

export const LINE_AUTHORIZE_URL = "https://access.line.me/oauth2/v2.1/authorize";
export const LINE_TOKEN_URL = "https://api.line.me/oauth2/v2.1/token";
export const LINE_VERIFY_URL = "https://api.line.me/oauth2/v2.1/verify";

export const LINE_STATE_COOKIE = "line_oauth";

export function lineConfig() {
  const channelId = process.env.LINE_CHANNEL_ID;
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  if (!channelId || !channelSecret) {
    throw new Error("LINE_CHANNEL_ID and LINE_CHANNEL_SECRET must be set");
  }
  return { channelId, channelSecret };
}

export function redirectUri(req: NextRequest) {
  const base = process.env.APP_URL ?? req.nextUrl.origin;
  return new URL("/api/auth/line/callback", base).toString();
}
