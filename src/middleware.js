import { NextResponse } from 'next/server';


export function middleware(request) {
  const user = request.cookies.get('jwt')


  const { pathname } = request.nextUrl;

  if (!user && pathname !== '/' && pathname !== '/signup' ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (user && pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  if (user && pathname === '/signup') {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/home/message','/' ,'/signup' ,'/super-admin']
};
