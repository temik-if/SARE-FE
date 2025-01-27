import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";

export const metadata: Metadata = {
  title: "SARE - Sistema de Agendamento de Recursos Educacionais",
  description: "Sistema de Agendamento de Recursos Educacionais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="pt-br">
        <body>
          <Header />
          {children}
        </body>
      </html>
    
  );
}
