"use client";
import "./globals.css";
import Header from "../components/Header/Header";
import Providers from "@/components/Providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
