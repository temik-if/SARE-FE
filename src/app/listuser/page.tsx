"use client"
import React, { useEffect, useState } from "react";
import { userService } from "@/service/userService";
import { IUser } from "@/types/user";
import CardItem from "@/components/CardItem/Carditem";
import styles from "./page.module.css";

export default function UsersPage() {
  const [dataList, setDataList] = useState<IUser[]>([]);

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

  const handleDeleteUser = async (user: IUser) => {
    try {
      await userService.deactivateUser(user.id);
      setDataList((prev) => prev.filter((u) => u.id !== user.id));
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
              type='user'
              onDelete={() => handleDeleteUser(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
