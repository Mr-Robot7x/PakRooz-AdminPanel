import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
   matcher: [
      "/dashboard/:path*",
      "/sign-in",
      "/sign-up",
      "/",
      
   ],
};

export async function middleware(request: NextRequest) {
   const token = await getToken({ req: request });
   const url = request.nextUrl;
    console.log(`url is ${token}`)
   // Redirect to dashboard if the user is already authenticated
   // and trying to access sign-in, sign-up, or home page
   if (
      token &&
      (url.pathname.startsWith("/sign-in") ||
         url.pathname.startsWith("/sign-up") ||
         url.pathname === "/")
   ) {
   console.log(`token is ${token}`)
      return NextResponse.redirect(new URL("/dashboard", request.url));
   }

   if (!token && url.pathname.startsWith("/dashboard") || url.pathname === "/") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
   }

   return NextResponse.next();
}