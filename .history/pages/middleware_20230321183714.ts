 
 import React from 'react'
 import { getToken } from 'next-auth/jwt';
 


 async function middleware(req) {
   return (
     <div>middleware</div>
   )
 }
 
 export default middleware