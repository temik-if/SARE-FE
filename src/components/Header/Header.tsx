"use client";
import React, { useEffect } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import NavMenu from "@/components/NavMenu/NavMenu";
import useWindowSize from "@/hooks/useWindowSize";
import MobileDrawerMenu from "../MobileDrawerMenu/MobileDrawerMenu";

export default function Header() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const isSmallScreen = useWindowSize();
  useEffect(() => {
    if (session) {
      if (session?.user.type == undefined) {
        update();
      }
    }
  });
  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    signOut();
  };

  if (status === "loading") return null;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={170} height={60} />
          </Link>
          {status === "unauthenticated" ? (
            <ButtonSecondary label="LOGIN" onClick={handleClick} />
          ) : session && isSmallScreen ? (
            <MobileDrawerMenu userType={session?.user.type} />
          ) : (
            <>
              <NavMenu userType={session?.user.type!!} />
              <ProfileMenu session={session} onLogout={handleLogout} />
            </>
          )}
        </div>
      </header>
    </>
  );
}
