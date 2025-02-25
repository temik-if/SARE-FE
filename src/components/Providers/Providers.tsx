"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SessionProvider>{children}</SessionProvider>
    </LocalizationProvider>
  );
};

export default Providers;
