"use client";

import React, { useEffect, useState } from "react";
import { IBooking, IBookingUpdate } from "@/types/booking";
import { bookingService } from "@/service/bookingService";
import CardItem from "@/components/CardItem/Carditem";
import EditModal from "@/components/UdpateModalAgendamento/UpdateModalAgendamento";
import DeleteModalAgendamento from "@/components/DeleteModalAgendamento/DeleteModalAgendamento";
import styles from "./page.module.css";
import { userService } from "@/service/userService";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<IBooking[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<IBooking | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedShift, setSelectedShift] = useState("mes");
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  useEffect(() => {
    // Filtra os agendamentos com base na opção selecionada
    const filterAgendamentos = async () => {
      try {
        if (selectedShift === "hoje") {
          const today = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
          const data = await bookingService.getByDate(today);
          setAgendamentos(data);
        } else if (selectedShift === "mes") {
          // Busca todos os agendamentos
          const allBookings = await bookingService.getAll();
          
          // Filtra os agendamentos do mês atual
          const today = new Date();
          const currentMonth = today.getMonth();
          const currentYear = today.getFullYear();

          const agendamentosDoMes = allBookings.filter((agendamento) => {
            const agendamentoDate = new Date(agendamento.date);
            return (
              agendamentoDate.getMonth() === currentMonth &&
              agendamentoDate.getFullYear() === currentYear
            );
          });

          setAgendamentos(agendamentosDoMes);
        } else if (selectedShift === "finalizados") {
          const data = await bookingService.getByStatus("COMPLETED");
          setAgendamentos(data);
        }
      } catch (error) {
        console.error("Erro ao filtrar agendamentos:", error);
      }
    };

    filterAgendamentos();
  }, [selectedShift]);

  const fetchAgendamentos = async () => {
    try {
      const data = await bookingService.getAllFromLoggedUser();
      const id = data[0].user_id;
      const user = await userService.getById(id);
      setUserType(user.type); // Armazena o tipo de usuário no estado

      if (user.type === "COORDINATOR") {
        const allBookings = await bookingService.getAll();
        setAgendamentos(allBookings);
      } else {
        setAgendamentos(data);
      }
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
      await bookingService.patch(selectedAgendamento.id,"COMPLETED");
      setAgendamentos((prev) => prev.filter((item) => item.resource_id !== selectedAgendamento.resource_id));
      handleCloseDeleteModal();
      setSuccessMessage("O agendamento foi concluido com sucesso.");
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Erro ao concluir agendamento:", error);
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
        {userType === "COORDINATOR" && (
          <FormControl>
            <RadioGroup
              row
              className={styles.radioButtonContainer}
              value={selectedShift}
              onChange={(event) => setSelectedShift(event.target.value)}
            >
              {[
                { value: "mes", label: "Mês" },
                { value: "hoje", label: "Hoje" },
                { value: "finalizados", label: "Finalizados" }
              ].map(({ value, label }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  className={styles.radioButton}
                  control={<Radio sx={{ "&.Mui-checked": { color: "#E56217" } }} />}
                  label={label}
                  sx={{
                    width: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    "& .MuiFormControlLabel-label": {
                      color: selectedShift === value ? "var(--primary)" : "inherit",
                      fontWeight: selectedShift === value ? "bold" : "inherit",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </div>
      <div className={styles.cards}>
        <div className={styles.listcards}>
          {agendamentos.length === 0 ? (
            <p className={styles.noBookingsMessage}>Nenhum agendamento encontrado.</p>
          ) : (
            agendamentos.map((item) => (
              <CardItem
                key={item.id}
                data1={item.date}
                data2={item.shift}
                type="agendamento"
                onDelete={() => handleOpenDeleteModal(item)}
                onEdit={() => handleEditAgendamento(item)}
              />
            ))
          )}
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