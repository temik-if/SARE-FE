"use client"
import React, { useState } from "react";
import ListDados from "@/components/DataList/DataList";
import agendamentos from "@/components/DataList/data/agendamento";
import DeleteModal from "@/components/DeleteModalRecurso/DeleteModalRecurso";

interface Agendamento {
    id: number;
    data: string;
    email: string;
}

export default function ListAgendamento() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);

    const handleDeleteClick = (agendamento: Agendamento) => {
      setSelectedAgendamento(agendamento);
      setIsModalOpen(true);
    };

    return (
      <>
        <ListDados
          title="Meus Agendamentos"
          buttonLabel="Realizar Agendamento"
          dataList={agendamentos}
          listType="agendamento"
          onDeleteUser={handleDeleteClick}
        />
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            setIsModalOpen(false);
          }}
          userData={{
            nome: selectedAgendamento?.data || '',
            email: selectedAgendamento?.email || ''
          }}
        />
      </>
    );
}