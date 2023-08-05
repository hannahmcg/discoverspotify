import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.JWT_SECRET});

    console.log(req.nextUrl.pathname)
    console.log(token)
    //const { pathname } = req.nextUrl.pathname;

    //console.log(reqUrl)

    // allow requests if:
    // 1. request is for next-auth session & provider fetching 
    // 2. token exists 

    if (req.url.includes("/api/auth") || token) {
        return NextResponse.next();
    }
  
    // redirect to login if they don't have a token and are requesting a protected route 
    if (!token && !req.nextUrl.pathname.includes("/login")) {
        console.log(req.nextUrl.pathname)
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();

   // return NextResponse.next();
 }

 export default middleware;
 