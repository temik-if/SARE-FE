import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isCoordinatorRoute =
    req.nextUrl.pathname.startsWith("/users") ||
    req.nextUrl.pathname.startsWith("/resources");

  if (isCoordinatorRoute && token.type !== "COORDINATOR") {
    return NextResponse.redirect(new URL("/no-access", req.url)); 
  }

  console.log("Token encontrado. Usuário autenticado:", token.email);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/bookings/new",
    "/resources/new",
    "/users/new",
    "/bookings",
    "/users",
    "/resources",
    "/profile",
  ],
};
