import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Session } from "next-auth";

import { auth, isAdminSession } from "@/auth";

type AdminRequest = NextRequest & {
  auth: Session | null;
};

export const proxy = auth((request: AdminRequest) => {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!request.auth?.user?.email) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (!isAdminSession(request.auth)) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    loginUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
