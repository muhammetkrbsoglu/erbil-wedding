
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isAdminRoute(req)) {
    auth.protect();
    // DEBUG: auth objesinin tamamını logla
    // Not: Bu log sadece geliştirme ortamında kullanılmalı, prod'da kaldırılmalı
    // eslint-disable-next-line no-console
    console.log('CLERK AUTH OBJECT:', JSON.stringify(auth));
    // ...role kontrolü buraya eklenecek...
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
