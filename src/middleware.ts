import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const verifyToken = async (token: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/verifytoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) throw new Error("Token verification failed");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Response was not JSON");
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicPath = [
    "/",
    "/signin",
    "/signup",
    "/about",
    "/contact",
  ].includes(pathname);
  const token = req.cookies.get("token")?.value || "";
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    const user = await verifyToken(token);
    if (user) {
      const { role, isAdminApproved } = user.data;

      if (isPublicPath) {
        let redirectPath = "/";
        switch (role) {
          case "user":
            redirectPath = isAdminApproved
              ? "/user/dashboard"
              : "/not-approved";
            break;
          case "admin":
            redirectPath = "/admin/dashboard";
            break;
          default:
            redirectPath = "/";
        }
        return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));
      } else {
        if (!isAdminApproved) {
          return NextResponse.redirect(
            new URL("/not-approved", req.nextUrl.origin)
          );
        }
        return NextResponse.next();
      }
    } else {
      // Clear the token cookie and redirect to signin
      const response = NextResponse.redirect(
        new URL("/signin", req.nextUrl.origin)
      );
      return response;
    }
  }

  if (!isPublicPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/contact",
    "/about",
    "/not-found",
    "/user/:path*",
    "/admin/:path*",
  ],
};
