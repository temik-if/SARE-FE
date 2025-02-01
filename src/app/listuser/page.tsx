import ListDados from "@/components/DataList/DataList";
import Users from "../../components/DataList/data/users";
import React from "react";

export default function ListUser() {
  return (
    <ListDados 
        title="Lista de Usuários" 
        buttonLabel="Adicionar Usuário" 
        dataList={Users} 
        listType="user"
      />
  );
}
