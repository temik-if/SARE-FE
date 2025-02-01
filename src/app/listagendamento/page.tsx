import ListDados from "@/components/DataList/DataList";
import agendamentos from "../../components/DataList/data/agendamento";
import React from "react";

export default function ListUser() {
  return (
    <ListDados 
        title="Meus Agendamentos" 
        buttonLabel="Realizar Agendamento" 
        dataList={agendamentos} 
        listType="agendamento"
      />
  );
}