"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./LoadingSessionOverlay.module.css";

const LoadingSessionOverlay = () => {
  const { status } = useSession();
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setShowOverlay(true);
    } else {
      const timer = setTimeout(() => {
        setShowOverlay(false); 
      }, 500);

      return () => clearTimeout(timer); 
    }
  }, [status]);

  if (!showOverlay) return null; 

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSessionOverlay;
