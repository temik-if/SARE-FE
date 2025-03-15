"use client";
import React, { useEffect, useState } from "react";
import { IUser, UserUpdate } from "@/types/user";
import { userService } from "@/service/userService";
import CardItem from "@/components/CardItem/Carditem";
import EditModal from "@/components/UdpateModal/UpdateModal";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import styles from "./page.module.css";
import { getSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UsersPage() {
  const [dataList, setDataList] = useState<IUser[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await userService.getActiveUsers();
      setDataList(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
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
      setDataList((prev) => prev.filter((u) => u.id !== selectedUser.id));
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
  
    const validData: UserUpdate = {};
    if (updatedData.firstName) validData.firstName = updatedData.firstName;
    if (updatedData.lastName) validData.lastName = updatedData.lastName;
    if (updatedData.type) validData.type = updatedData.type;
  
    if (updatedData.email && updatedData.email !== selectedUser.email) {
      validData.email = updatedData.email;
    }
  
    try {
      const session = await getSession();
      const accessToken = session?.accessToken;
  
      if (!accessToken) {
        console.error("Token de autenticação não encontrado.");
        return;
      }
  
      const response = await fetch(`https://sare-be.onrender.com/user/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Accept": "*/*",
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: validData.firstName,
          last_name: validData.lastName,
          email: validData.email,
          type: validData.type,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "Email already in use") {
          toast.warning("Este email já está sendo utilizado.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          throw new Error(`Erro ao atualizar usuário: ${response.statusText}`);
        }
        return;
      }
  
      setDataList((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, ...validData } : u
        )
      );
      setIsEditModalOpen(false);
      setShowSuccessPopup(true); // Exibe o modal de sucesso
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.header}>
        <h1>Lista de Usuários</h1>
        <button>Adicionar Usuário</button>
      </div>
      <div className={styles.cards}>
        <div className={styles.listcards}>
          {dataList.map((item) => (
            <CardItem
              key={item.id}
              data1={item.full_name}
              data2={item.email}
              type="user"
              onDelete={() => handleOpenDeleteModal(item)}
              onEdit={() => handleEditUser(item)}
            />
          ))}
        </div>
      </div>

      {isEditModalOpen && selectedUser && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={handleUpdateUser}
          userData={{
            firstName: selectedUser.first_name,
            lastName: selectedUser.last_name,
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
          userData={{ nome: selectedUser.full_name, email: selectedUser.email }}
        />
      )}

      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>O usuário foi atualizado com sucesso.</p>
            <button
              className={styles.popupButton}
              onClick={() => {
                setShowSuccessPopup(false);
                window.location.reload();
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}