import LoginForm from "@/components/LoginForm/LoginForm";
import styles from "./login.module.css";
import React from "react";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
