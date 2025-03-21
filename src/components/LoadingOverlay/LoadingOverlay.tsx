"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./LoadingOverlay.module.css";

const LoadingOverlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingOverlay;
