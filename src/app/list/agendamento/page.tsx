"use client";

import React, { useEffect, useState } from "react";
import { IResource } from "@/types/resource";
import { resourceService } from "@/service/resourceService";
import CardItem from "@/components/CardItem/Carditem";
import EditModal from "@/components/UpdateModalRecurso/UpdateModalRecurso";
import DeleteModalRecurso from "@/components/DeleteModalRecurso/DeleteModalRecurso";
import styles from "./page.module.css";

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<IResource[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<IResource | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const data = await resourceService.getAll();
      // const availableAgendamentos = data.filter((item: IResource) => item.status === "AVAILABLE");
      setAgendamentos(data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos disponíveis:", error);
    }
  };

  const handleOpenDeleteModal = (agendamento: IResource) => {
    setSelectedAgendamento(agendamento);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAgendamento(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAgendamento) return;

    try {
      await resourceService.updateResourceStatus(String(selectedAgendamento.id), "UNAVAILABLE");
      setAgendamentos((prev) => prev.filter((item) => item.id !== selectedAgendamento.id));
      handleCloseDeleteModal();
      setSuccessMessage(`O ${selectedAgendamento.equipment ? "equipamento" : "sala"} foi desabilitado com sucesso.`);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Erro ao marcar agendamento como indisponível:", error);
    }
  };

  const handleEditAgendamento = (agendamento: IResource) => {
    setSelectedAgendamento(agendamento);
    setIsEditModalOpen(true);
  };

  const handleUpdateAgendamento = async (updatedData: Partial<IResource>) => {
    if (!selectedAgendamento) return;

    try {
      await resourceService.updateResource(String(selectedAgendamento.id), updatedData);
      setAgendamentos((prev) =>
        prev.map((item) =>
          item.id === selectedAgendamento.id ? { ...item, ...updatedData } : item
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Lista de Agendamentos</h1>
      </div>
      <div className={styles.cards}>
        <div className={styles.listcards}>
          {agendamentos.map((item) => (
            <CardItem
              key={item.id}
              data1={item.name}
              data2={item.status}
              type="agendamento"
              onDelete={() => handleOpenDeleteModal(item)}
              onEdit={() => handleEditAgendamento(item)}
            />
          ))}
        </div>
      </div>

      {selectedAgendamento && isDeleteModalOpen && (
        <DeleteModalRecurso
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          resource={selectedAgendamento}
        />
      )}

      {selectedAgendamento && isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          resource={selectedAgendamento}
          onUpdate={handleUpdateAgendamento}
        />
      )}

      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>{successMessage}</p>
            <button
              className={styles.popupButton}
              onClick={() => setShowSuccessPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
