import { getServerSession, Session } from "next-auth";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers/Providers";
import "./globals.css";

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
          <Header session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
