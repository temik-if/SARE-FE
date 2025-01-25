"use client";
import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>LOGIN</h2>
        <form className={styles.form}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={`${styles.input} ${styles.email}`}
            type="email"
            id="email"
            name="email"
            required
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <div className={styles.passwordContainer}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className={styles.eyeContainer}>
              {showPassword ? (
                <FaEye onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash onClick={togglePasswordVisibility} />
              )}
            </span>
          </div>
          <p className={styles.resetPassword}>
            Esqueceu a senha?{" "}
            <Link className={styles.resetLink} href="/reset-password">
              Clique aqui para recuperar
            </Link>
          </p>
          <button
            className={`${styles.button} ${styles.button__login}`}
            type="submit"
          >
            ENTRAR
          </button>
          <button
            className={`${styles.button} ${styles.button__google}`}
            type="submit"
          >
            <FcGoogle className={styles.googleIcon} />
            ENTRAR COM GOOGLE
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
