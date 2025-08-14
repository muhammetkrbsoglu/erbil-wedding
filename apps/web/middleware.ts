

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

export default clerkMiddleware(async (auth, req) => {
  // Eğer rota public ise veya admin-giris sayfasına gidiyorsa, koruma uygulamadan geç
  if (isPublicRoute(req)) {
    return;
  }

  // Eğer rota korumalı ise, authentication gerektir
  if (isProtectedRoute(req)) {
    try {
      const session = await auth();
      if (!session.userId) {
        return Response.redirect(new URL('/admin-giris', req.url));
      }
    } catch (err) {
      return Response.redirect(new URL('/admin-giris', req.url));
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
