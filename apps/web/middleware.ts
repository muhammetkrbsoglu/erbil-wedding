import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
 
// This example protects all routes including api/trpc routes
export default clerkMiddleware(async (auth, request) => {
  const session = await auth();
  const path = request.nextUrl.pathname;

  // Allow public routes
  if (path === "/" || path === "/admin-login" || path.startsWith("/api/webhook/clerk")) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (path.startsWith("/admin") && !session.userId) {
    const signInUrl = new URL("/admin-login", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
