import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is a placeholder for actual Firebase Auth verification
// In a real production app, you would verify the session cookie or token here
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ['/dashboard', '/admin', '/checkout', '/cart', '/books', '/book'];

  // For demonstration, we'll just check if a 'user_session' cookie exists
  // You would replace this with actual Firebase Auth verification logic
  const isAuth = request.cookies.has('user_session');

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuth) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin protection
  if (pathname.startsWith('/admin')) {
    const userRole = request.cookies.get('user_role')?.value;
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/checkout/:path*',
    '/cart/:path*',
    '/books/:path*',
    '/book/:path*'
  ],
};
