import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


const middleware = async (req: NextRequest) => {
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const { reqUrl } = req.nextUrl.pathname;

    console.log(reqUrl)

    // allow requests if:
    // 1. request is for next-auth session & provider fetching 
    // 2. token exists 

    if (reqUrl.includes("/api/auth") || token) {
        return NextResponse.next();
    }
  
    // redirect to login if they don't have a token and are requesting a protected route 
    if (!token && reqUrl !== "/login") {
        console.log(reqUrl)
        return NextResponse.redirect("/login");
    }

    return NextResponse.next();
 }
 
 export default middleware;