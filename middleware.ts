import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.JWT_SECRET});

    //const { pathname } = req.nextUrl.pathname;

    // allow requests if:
    // 1. request is for next-auth session & provider fetching 
    // 2. token exists 

    const url = req.nextUrl.clone()

    if (url.pathname.startsWith("/_next") || token) {
        return NextResponse.next();
    }

    if (url.pathname.includes("/api/auth")) {
        return NextResponse.next();
    }
  
    // redirect to login if they don't have a token and are requesting a protected route 
    if (!token && url.pathname !== ("/login")) {
        console.log(url.pathname)
        url.pathname = "/login";
        console.log(url.pathname)
        return NextResponse.redirect(url)
        //const loginUrl = new URL('/login', req.url);
        //return NextResponse.redirect("/api/auth/signin");
        //return NextResponse.redirect(loginUrl);
        //return NextResponse.rewrite(new URL('/login', req.url));
    }

   // return NextResponse.next();
 }

 export default middleware;
 