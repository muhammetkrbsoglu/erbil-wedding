import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/salonlar/(.*)',
  '/randevu-basarili',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/admin-giris(.*)',
  '/api/webhook/clerk'
]);

export default clerkMiddleware(async (auth, request) => {
  const path = request.nextUrl.pathname;

  // Allow public routes
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (path.startsWith('/admin')) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL('/admin-giris', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
