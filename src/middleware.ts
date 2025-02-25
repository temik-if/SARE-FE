import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log("Token não encontrado. Redirecionando para login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  
  console.log("Token encontrado. Usuário autenticado:", token.email);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("Authorization", `Bearer ${token.accessToken}`);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher:[ 
    "/agendamentos/novo",
    "/cadastro",
    "/listagendamento",
    "/listuser"
  ]
};
