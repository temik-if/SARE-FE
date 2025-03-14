"use client"
import React, { useState } from "react";
import ListDados from "@/components/DataList/DataList";
import agendamentos from "@/components/DataList/data/agendamento";
import DeleteModal from "@/components/DeleteModalRecurso/DeleteModalRecurso";
import EditModal from "@/components/EditModalRecurso/EditModalRecurso";

interface Agendamento {
    id: number;
    data: string;
    email: string;
}

export default function ListAgendamento() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);

    const handleDeleteClick = (agendamento: Agendamento) => {
      setSelectedAgendamento(agendamento);
      setIsModalOpen(true);
    };

    const handleEditClick = (agendamento: Agendamento) => { 
        setSelectedAgendamento(agendamento);
        setIsEditModalOpen(true);
      };

    return (
      <>
        <ListDados
          title="Meus Agendamentos"
          buttonLabel="Realizar Agendamento"
          dataList={agendamentos}
          listType="agendamento"
          onDeleteUser={handleDeleteClick}
          onEditUser={handleEditClick}  
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

        <EditModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={() => {
            setIsEditModalOpen(false);
          }}
          userData={{
            nome: selectedAgendamento?.data || '',
            email: selectedAgendamento?.email || ''
          }}
        />
      </>
    );
}