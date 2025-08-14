
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/', // Homepage
  '/salonlar/(.*)', // All salon detail and appointment pages
  '/randevu-basarili', // The "thank you" page
  '/sign-in(.*)', // The sign-in page
  '/sign-up(.*)', // The sign-up page
]);

export default clerkMiddleware((auth, req) => {
  // Protect all routes that are not explicitly marked as public.
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
