"use client"
import React, { useState } from "react";
import ListDados from "@/components/DataList/DataList";
import Users from "../../components/DataList/data/users";
import DeleteModal from "@/components/DeleteModal/DeleteModal";

interface User {
  id: number;
  data1: string;
  data2: string;
}

export default function ListUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <ListDados
        title="Lista de Usuários"
        buttonLabel="Adicionar Usuário"
        dataList={Users}
        listType="user"
        onDeleteUser={handleDeleteClick}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        userData={{
          nome: selectedUser?.data1 || '',
          email: selectedUser?.data2 || ''
        }}
      />
    </>
  );
}
