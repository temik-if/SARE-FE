"use client";
import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdError } from "react-icons/md";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

type LoginFormInput = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um endereço de e-mail válido")
    .required("Insira o e-mail"),
  password: yup.string().required("Insira a senha"),
});

const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false)

  const errorMessages: Record<string, string> = {
    unauthorized: "Seu e-mail não tem permissão para acessar. Contate um administrador.",
    server_error: "Erro interno do servidor. Tente novamente mais tarde.",
    invalid_token: "Falha na autenticação. Tente novamente.",
    server_unreachable: "Não foi possível conectar ao servidor.",
    unknown_error: "Ocorreu um erro inesperado.",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    setLoading(true);
    setLoginError(""); 

    const timeoutId = setTimeout(() => {
      setLoginError("Servidor indisponível. Tente novamente em alguns minutos.");
      setLoading(false);
    }, 20000);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    clearTimeout(timeoutId);

    if (result?.error) {
      setLoginError("E-mail ou senha incorretos");
      setLoading(false)
    } else if (result?.ok) {
      router.push("/");
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const error = searchParams.get("error");

    if (!error) return;

    setLoginError(errorMessages[error] || errorMessages["unknown_error"]);

    setTimeout(
      () => {
        router.push("/login");
      },
      error === "unauthorized" ? 3000 : 5000
    );
  }, [searchParams, router]);

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      {loading && <LoadingOverlay />}
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
          {loginError && (
            <div className={styles.loginError}>
              <div className={styles.errIcon}>
                <MdError />
              </div>
              <p>{loginError}</p>
            </div>
          )}
          <button
            className={`${styles.button} ${styles.button__login}`}
            type="submit"
          >
            ENTRAR
          </button>
          <button
            className={`${styles.button} ${styles.button__google}`}
            type="button"
            onClick={handleGoogleLogin}
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
