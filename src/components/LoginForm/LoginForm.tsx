"use client";
import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { signIn } from "next-auth/react";

type LoginFormInput = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Insira um endereço de e-mail válido").required("Insira o e-mail"),
  password: yup.string().required("Insira a senha"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    }).then((response) => {
      console.log(response);
    });
  }

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    
    if (email && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>LOGIN</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={`${styles.input} ${styles.email}`}
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <div className={styles.passwordContainer}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
            />
            <span className={styles.eyeContainer}>
              {showPassword ? (
                <FaEye onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash onClick={togglePasswordVisibility} />
              )}
            </span>
          </div>
          {errors.password && (
            <div className={styles.error}>{errors.password.message}</div>
          )}
          <p className={styles.resetPassword}>
            Esqueceu a senha?{" "}
            <Link className={styles.resetLink} href="/reset-password">
              Clique aqui para recuperar
            </Link>
          </p>
          <button
            className={`${styles.button} ${styles.button__login}`}
            type="submit"
            disabled={isButtonDisabled}
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
