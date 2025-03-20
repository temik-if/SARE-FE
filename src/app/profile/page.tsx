"use client";
import React, { useEffect } from "react";
import styles from "./profile.module.css";
import { useSession } from "next-auth/react";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

export default function Page() {
  const { data: session, status } = useSession();
  const [isEditMode, setIsEditMode] = React.useState(false);
  
  const handleEdit = () => {
    setIsEditMode(true);
  };
  
  return (
    <>
      <LoadingOverlay />
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
                    <label htmlFor="name">Primeiro Nome:</label>
                    <input
                      type="text"
                      id="first_name"
                      defaultValue={session?.user?.firstName || ""}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="last_name">Sobrenome:</label>
                    <input
                      type="text"
                      id="last_name"
                      defaultValue={session?.user?.lastName || ""}
                    />
                  </div>
                </>
              ) : (
                <span className={styles.nameInfo}>{session?.user?.name}</span>
              )}
            </div>
            {!isEditMode ? (
              <div className={styles.type}>
                <p>
                  {session?.user.type === "COORDINATOR"
                    ? "Coordenador Pedagógico"
                    : "Professor"}
                </p>
              </div>
            ) : null}
            <div className={styles.fieldContainer}>
              <div className={styles.field}>
                <label htmlFor="email">Email:</label>
                {isEditMode ? (
                  <input
                    type="email"
                    id="email"
                    defaultValue={session?.user?.email || ""}
                  />
                ) : (
                  <span className={styles.accountInfo}>
                    {session?.user?.email || ""}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="password">Senha:</label>
                {isEditMode ? (
                  <input type="password" id="password" />
                ) : (
                  <span className={styles.accountInfo}>********</span>
                )}
              </div>
              <div
                className={
                  isEditMode
                    ? styles.buttonsContainer
                    : styles.oneButtonContainer
                }
              >
                {isEditMode ? (
                  <button
                    className={styles.editButton}
                    onClick={() => setIsEditMode(false)}
                  >
                    CANCELAR
                  </button>
                ) : null}
                <button className={styles.editButton} onClick={handleEdit}>
                  {isEditMode ? "SALVAR" : "EDITAR"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
