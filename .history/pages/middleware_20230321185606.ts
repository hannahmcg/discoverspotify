 
import { getToken } from 'next-auth/jwt';
import { NextResponse, URLPattern } from 'next/server';


const middleware = async (req: any) => {
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const { reqUrl } = req.nextUrl.clone();

    // allow requests if:
    // 1. request is for next-auth session & provider fetching 
    // 2. token exists 

    if (reqUrl.includes ("/api/auth") || token ) {
        return NextResponse.next();
    }
  
    // redirec to login if they don't have a token and are requesting a protected route 
    if (!token && reqUrl.pathname !== '/login') {
        return NextResponse.redirect('/login');
    }

 }
 
 export default middleware;