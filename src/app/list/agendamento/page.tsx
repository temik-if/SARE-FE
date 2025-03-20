"use client";

import React, { useEffect, useState } from "react";
import { IBooking, IBookingUpdate } from "@/types/booking";
import { bookingService } from "@/service/bookingService";
import CardItem from "@/components/CardItem/Carditem";
import EditModal from "@/components/UdpateModalAgendamento/UpdateModalAgendamento";
import DeleteModalAgendamento from "@/components/DeleteModalAgendamento/DeleteModalAgendamento";
import styles from "./page.module.css";

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<IBooking[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<IBooking | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const data = await bookingService.getAllFromLoggedUser();
      setAgendamentos(data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const handleOpenDeleteModal = (agendamento: IBooking) => {
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
      await bookingService.delete(selectedAgendamento.id);
      setAgendamentos((prev) => prev.filter((item) => item.resource_id !== selectedAgendamento.resource_id));
      handleCloseDeleteModal();
      setSuccessMessage("O agendamento foi cancelado com sucesso.");
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
    }
  };

  const handleEditAgendamento = (agendamento: IBooking) => {
    setSelectedAgendamento(agendamento);
    setIsEditModalOpen(true);
  };

  const handleUpdateAgendamento = async (updatedData: IBookingUpdate) => {
    if (!selectedAgendamento) return;

    try {
      await bookingService.update(selectedAgendamento.resource_id, updatedData);
      setAgendamentos((prev) =>
        prev.map((item) => (item.resource_id === selectedAgendamento.resource_id ? { ...item, ...updatedData } : item))
      );
      setIsEditModalOpen(false);
      setSuccessMessage("O agendamento foi atualizado com sucesso.");
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      setErrorMessage("Ocorreu um erro ao atualizar o agendamento. Tente novamente.");
      setShowErrorPopup(true);
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
              data1={item.date}
              data2={item.shift}
              type="agendamento"
              onDelete={() => handleOpenDeleteModal(item)}
              onEdit={() => handleEditAgendamento(item)}
            />
          ))}
        </div>
      </div>

      {selectedAgendamento && isDeleteModalOpen && (
        <DeleteModalAgendamento
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          bookingData={selectedAgendamento}
        />
      )}

      {selectedAgendamento && isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          bookingData={{ ...selectedAgendamento }} // Converte para IBookingUpdate
          onConfirm={handleUpdateAgendamento}
        />
      )}

      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>{successMessage}</p>
            <button className={styles.popupButton} onClick={() => setShowSuccessPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      {showErrorPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>{errorMessage}</p>
            <button className={styles.popupButton} onClick={() => setShowErrorPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}