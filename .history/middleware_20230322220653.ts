import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.JWT_SECRET});

    console.log(req.nextUrl.pathname)
    console.log(token)
    //const { pathname } = req.nextUrl.pathname;

    //console.log(reqUrl)

    // allow requests if:
    // 1. request is for next-auth session & provider fetching 
    // 2. token exists 

    if (req.nextUrl.pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }
  
    // redirect to login if they don't have a token and are requesting a protected route 
    if (!token && req.nextUrl.pathname !== "/login") {
        console.log(req.nextUrl.pathname)
        return NextResponse.redirect("/login");
    }

   // return NextResponse.next();
 }
 