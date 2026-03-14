import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes - no auth required
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/forgot-password', '/catalog'];
  if (publicRoutes.includes(pathname) || pathname.startsWith('/catalog/') || pathname.startsWith('/auth/')) {
    return NextResponse.next();
  }

  // Protected routes - check for Firebase auth session
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/api/modules')) {
    const authSessionCookie = request.cookies.get('__session')?.value;
    
    // If no auth session, redirect to login
    if (!authSessionCookie) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|public).*)'],
};
