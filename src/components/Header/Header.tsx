import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Image src="/images/logo.png" alt="Logo" width={170} height={60} />
        </div>
      </header>
    </> 
  );
}
