import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(){
    return NextResponse.next()
  },
  {
    callbacks:{
      authorized({req, token}){
        const {pathname} = req.nextUrl
         const publicPaths = [
          "/",
          "/login",
          "/register",
          "/videos",
        ];

        // Allow unauthenticated access to GET /api/video only
        const isPublicApiGetVideo =
          pathname === "/api/video" && req.method === "GET";

        // ✅ If it's a public page or GET video API, allow
        if (publicPaths.includes(pathname) || isPublicApiGetVideo) {
          return true;
        }

        // ✅ All other routes (like /upload, POST /api/video) require login
        return !!token;
      }
    }
  }
)

export const config = { matcher: [
    

  "/((?!_next/static|_next/image|favicon.ico|public/).*)",


] } 