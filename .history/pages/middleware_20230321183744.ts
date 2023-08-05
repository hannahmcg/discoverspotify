 
import { getToken } from 'next-auth/jwt';
import { NextResponse, URLPattern } from 'next/server';



 async function middleware(req) {
   return (
     <div>middleware</div>
   )
 }
 
 export default middleware