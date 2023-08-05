 
import { getToken } from 'next-auth/jwt';
import { NextResponse, URLPattern } from 'next/server';


const middleware = async (req: any) => {
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const { pathname } = req.nextUrl;
   
 }
 
 export default middleware