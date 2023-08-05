 
import { getToken } from 'next-auth/jwt';
import { NextResponse, URLPattern } from 'next/server';


const middleware = async (req: any) => {
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const { pathname } = req.nextUrl;

    // allow requests if:
    // 1. request is for next-auth session & provider fetching 
    // 2. token exists 

    if (pathname.startsWith("/next") || token ) return NextResponse.next();

    if (pathname === "/") {
        req.nextUrl.pathname = "/login";
        return NextResponse.redirect(req.nextUrl);
    }

    return NextResponse.next();
   
 }
 
 export default middleware