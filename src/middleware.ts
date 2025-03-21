import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verificando se o usuário é do tipo 'COORDINATOR' antes de acessar as rotas de cadastro e listagem
  const isCoordinatorRoute =
    req.nextUrl.pathname.startsWith("/cadastro") ||
    req.nextUrl.pathname.startsWith("/list/user") ||
    req.nextUrl.pathname.startsWith("/list/resources");

  if (isCoordinatorRoute && token.type !== "COORDINATOR") {
    return NextResponse.redirect(new URL("/no-access", req.url)); // Redireciona se não for coordenador
  }

  console.log("Token encontrado. Usuário autenticado:", token.email);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/agendamentos/novo",
    "/cadastro/resources",
    "/cadastro/user",
    "/list/agendamento",
    "/list/user",
    "/list/resources",
    "/profile",
  ],
};
