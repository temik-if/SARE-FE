"use client"
import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";

type HeaderProps = {
  session: Session | null;
};

export default function Header({ session }: HeaderProps) {
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      signOut();
    } else { 
      router.push("/login");
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={170} height={60} />
          </Link>
          <ButtonSecondary
            label={session ? "SAIR" : "LOGIN"}
            onClick={handleClick}
          />
        </div>
      </header>
    </>
  );
}
