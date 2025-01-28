"use client";
import "./globals.css";
import Header from "../components/Header/Header";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <html lang="pt-br">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </LocalizationProvider>
  );
}
