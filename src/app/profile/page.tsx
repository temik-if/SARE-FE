"use client";
import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { useSession, signIn, getSession } from "next-auth/react";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { useRouter } from "next/navigation";
import { userService } from "../../service/userService";
import { UserUpdateResponse } from "@/types/user";
import PopUp from "@/components/PopUp/PopUp";
import LoadingSessionOverlay from "@/components/LoadingSessionOverlay/LoadingSessionOverlay";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState(session?.user.firstName || "");
  const [lastName, setLastName] = useState(session?.user.lastName || "");
  const [fullName, setFullName] = useState(session?.user.name || "");
  const [email, setEmail] = useState(session?.user.email || "");
  const [userType, setUsertype] = useState(session?.user.type || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (!firstName && !lastName) {
        setFirstName(session.user.firstName || "");
        setLastName(session.user.lastName || "");
        setUsertype(session.user.type);
        setFullName(session.user.name);
      }
    }
  }, [status, session, firstName, lastName]);

  const handleSave = async () => {
    if (!currentPassword) {
      setError("Digite sua senha para confirmar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: session?.user.email,
        password: currentPassword,
      });

      if (!res || res.error) {
        setError("Senha incorreta.");
        setLoading(false);
        return;
      }

      const updateData: any = {
        first_name: firstName,
        last_name: lastName,
      };

      if (userType === "COORDINATOR" && email !== session?.user.email) {
        updateData.email = email; 
      }

      await userService
        .updateUser(session?.user.id!!, updateData)
        .then((data) => {
          const updatedData = data as UserUpdateResponse;
        
          setFullName(updatedData.full_name);
          setFirstName(updatedData.first_name);
          setLastName(updatedData.last_name)
          setEmail(updatedData.email)
          setPopUpMessage("Dados alterados com sucesso!");
          setIsPopUpOpen(true);
        })
        .catch((e) => {
          console.log(e);
          setPopUpMessage(
            "Um erro inesperado aconteceu. Tente novamente mais tarde."
          );
          setIsPopUpOpen(true);
        });

      const updatedSession = await getSession();

      await update({
        user: {
          ...updatedSession?.user,
          firstName,
          lastName,
          email:
            userType === "COORDINATOR" ? email : updatedSession?.user.email,
        },
      });

      setCurrentPassword("");

      router.refresh();

      setIsEditMode(false);
    } catch (err) {
      setError("Erro ao atualizar os dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      {isPopUpOpen && (
        <PopUp
          message={popUpMessage}
          isOpen={isPopUpOpen}
          onConfirm={() => {
            setIsPopUpOpen(false);
          }}
        />
      )}
      {session && status === "authenticated" ? (
        <div className={styles.container}>
          <h1>Meus Dados</h1>
          <div className={styles.profileDetails}>
            <div className={styles.profileImageContainer}>
              <img
                src={
                  session?.user?.profilePicture || "/images/default-user.jpg"
                }
                alt="User profile"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.nameContainer}>
              {isEditMode ? (
                <>
                  <div className={styles.field}>
                    <label htmlFor="first_name">Primeiro Nome:</label>
                    <input
                      type="text"
                      id="first_name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="last_name">Sobrenome:</label>
                    <input
                      type="text"
                      id="last_name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <span className={styles.nameInfo}>{fullName}</span>
              )}
            </div>
            {!isEditMode && (
              <div className={styles.type}>
                <p>
                  {userType === "COORDINATOR"
                    ? "Coordenador Pedagógico"
                    : userType === "TEACHER"
                    ? "Professor"
                    : ""}
                </p>
              </div>
            )}
            <div className={styles.fieldContainer}>
              <div className={styles.field}>
                <label htmlFor="email">Email:</label>
                {isEditMode ? (
                  <>
                    <input
                      autoComplete="off"
                      disabled={userType != "COORDINATOR"}
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {userType !== "COORDINATOR" && (
                      <p className={styles.inputInfo}>
                        Para alterar o email, solicite ao coordenador pedagógico
                      </p>
                    )}
                  </>
                ) : (
                  <p className={styles.accountInfo}>
                    {session?.user?.email || ""}
                  </p>
                )}
              </div>
              <div className={styles.field}>
                <label htmlFor="password">Senha:</label>
                {isEditMode ? (
                  <>
                    <input
                      type="password"
                      id="password"
                      autoComplete="off"
                      placeholder="Digite sua senha atual para confirmar sua identidade"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                  </>
                ) : (
                  <p className={styles.accountInfo}>********</p>
                )}
              </div>
              <div className={styles.buttonsContainer}>
                {isEditMode ? (
                  <>
                    <button
                      className={styles.editButton}
                      onClick={() => setIsEditMode(false)}
                    >
                      CANCELAR
                    </button>
                    <button
                      className={styles.editButton}
                      onClick={handleSave}
                      disabled={loading}
                    >
                      SALVAR
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.editButton}
                      onClick={() => router.push("/redefinir-senha")}
                    >
                      REDEFINIR SENHA
                    </button>
                    <button
                      className={styles.editButton}
                      onClick={() => setIsEditMode(true)}
                    >
                      EDITAR NOME
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
