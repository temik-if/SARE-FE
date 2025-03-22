import { getServerSession, Session } from "next-auth";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers/Providers";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SARE - Sistema de Agendamento de Recursos Educacionais",
  description: "Sistema para agendamento e gerenciamento de recursos educacionais",
  icons: "/favicon.svg", 
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(GET) as Session | null;
  return (
    <html lang="pt-br">
      <body>
        <Providers session={session}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
