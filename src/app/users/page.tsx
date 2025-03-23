"use client";
import React, { useEffect, useState } from "react";
import { IUser, UserUpdate } from "@/types/user";
import { userService } from "@/service/userService";
import EditModal from "@/components/UdpateModal/UpdateModal";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import styles from "./page.module.css";
import UserListItem from "@/components/UserListItem/UserListItem";
import ButtonPrimary from "@/components/ButtonPrimary/ButtonPrimary";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

export default function UsersPage() {
  const router = useRouter();
  const [dataList, setDataList] = useState<IUser[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers(true);
  }, []);

  const fetchUsers = async (is_active: boolean) => {
    setLoading(true);
    try {
      const users = await userService.getActiveUsers(is_active);
      setDataList(users);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setLoading(false);
    }
  };

  const handleOpenDeleteModal = (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await userService.deactivateUser(selectedUser.id);
      fetchUsers(true);
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao desativar usuário:", error);
    }
  };

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (updatedData: UserUpdate) => {
    if (!selectedUser) return;

    const validData: Partial<UserUpdate> = {};

    if (
      updatedData.first_name &&
      updatedData.first_name !== selectedUser.first_name
    ) {
      validData.first_name = updatedData.first_name;
    }
    if (
      updatedData.last_name &&
      updatedData.last_name !== selectedUser.last_name
    ) {
      validData.last_name = updatedData.last_name;
    }
    if (updatedData.type && updatedData.type !== selectedUser.type) {
      validData.type = updatedData.type;
    }
    if (updatedData.email && updatedData.email !== selectedUser.email) {
      validData.email = updatedData.email;
    }

    if (Object.keys(validData).length === 0) {
      console.log("Nenhuma alteração detectada.");
      setIsEditModalOpen(false);
      return;
    }

    try {
      await userService.updateUser(selectedUser.id, validData);
      fetchUsers(true);
      setIsEditModalOpen(false);
      setShowSuccessPopup(true);
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      setErrorMessage(
        error?.message || "Ocorreu um erro ao atualizar o usuário."
      );
      setShowErrorPopup(true);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Lista de Usuários</h2>
          <ButtonPrimary
            label="CADASTRAR NOVO"
            onClick={() => router.push("/users/new")}
          />
        </div>

        <div className={styles.userList}>
          {dataList.map((item) => (
            <UserListItem
              key={item.id}
              user={item}
              onEdit={handleEditUser}
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </div>

        {isEditModalOpen && selectedUser && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onConfirm={handleUpdateUser}
            userData={{
              first_name: selectedUser.first_name,
              last_name: selectedUser.last_name,
              email: selectedUser.email,
              type: selectedUser.type as "TEACHER" | "COORDINATOR",
            }}
          />
        )}

        {selectedUser && isModalOpen && (
          <DeleteModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            userData={{
              nome: selectedUser.full_name,
              email: selectedUser.email,
            }}
          />
        )}

        {showSuccessPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <p>O usuário foi atualizado com sucesso.</p>
              <button
                className={styles.popupButton}
                onClick={() => setShowSuccessPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {showErrorPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <p>{errorMessage}</p>
              <button
                className={styles.popupButton}
                onClick={() => setShowErrorPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
