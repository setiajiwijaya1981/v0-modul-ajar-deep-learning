import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/catalog'];
  if (publicRoutes.includes(pathname) || pathname.startsWith('/catalog/')) {
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/api/')) {
    const token = request.cookies.get('auth_session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const payload = await verifyAuthToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Admin routes check
    if (pathname.startsWith('/admin') && payload.role !== 'admin' && payload.role !== 'school_admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
