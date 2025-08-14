import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/salonlar/(.*)',
  '/randevu-basarili',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/admin-giris(.*)', // Admin login and all its children are public
]);

const isProtectedRoute = createRouteMatcher([
  '/admin',
  '/admin/(.*)', // Admin panel routes
]);

export default clerkMiddleware((auth, req) => {
  // Public route ise hiçbir işlem yapma
  if (isPublicRoute(req)) {
    return;
  }

  // Sadece /admin ve alt rotalar korumalı
  if (isProtectedRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
