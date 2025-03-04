"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  session: Session | null;
}

const Providers = ({ children, session }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </LocalizationProvider>
  );
};

export default Providers;
