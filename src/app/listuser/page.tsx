"use client"
import React, { useEffect, useState } from "react";
import { userService } from "@/service/userService";
import { IUser } from "@/types/user";
import CardItem from "@/components/CardItem/Carditem";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import styles from "./page.module.css";

export default function UsersPage() {
  const [dataList, setDataList] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

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

  const handleOpenModal = (user: IUser) => {
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

  return (
    <div className={styles.container}>
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
              onDelete={() => handleOpenModal(item)} // Agora abre o modal
            />
          ))}
        </div>
      </div>

      {/* Modal de Exclusão */}
      {selectedUser && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          userData={{ nome: selectedUser.full_name, email: selectedUser.email }}
        />
      )}
    </div>
  );
}
