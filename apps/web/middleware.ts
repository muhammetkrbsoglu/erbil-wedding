
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/', // Homepage
  '/salonlar/(.*)', // All salon detail and appointment pages
  '/randevu-basarili', // The "thank you" page
  '/sign-in(.*)', // The sign-in page
  '/sign-up(.*)', // The sign-up page
]);
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect(); // This will redirect unauthenticated users to the sign-in URL specified in your env variables or default to a Clerk-hosted page if not set. We will set this in the next step.
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
