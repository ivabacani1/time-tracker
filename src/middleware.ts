import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token",
  });
  const isAuthenticated = !!token;

  if (
    (req.nextUrl.pathname.startsWith("/signin") ||
      req.nextUrl.pathname.startsWith("/signup")) &&
    !isAuthenticated
  ) {
    return;
  }

  if (req.nextUrl.pathname.startsWith("/signin")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: `/signin`,
      newUser: `/signin`,
    },
  });

  //  @ts-expect-error
  return authMiddleware(req, event);
}
