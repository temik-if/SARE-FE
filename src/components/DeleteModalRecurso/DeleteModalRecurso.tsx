import React from "react";
import styles from "./DeleteModalRecurso.module.css";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  resource: {
    name: string;
    equipment?: {
      serial_number: string;
      model: string;
      brand: string;
    } | null;
    room?: {
      capacity: number;
    } | null;
  };
}

export default function DeleteModal({ isOpen, onClose, onConfirm, resource }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Deseja excluir este recurso?</h2>

        <div className={styles.field}>
          <label>Nome</label>
          <input type="text" value={resource.name} disabled />
        </div>

        {resource.equipment && (
          <>
            <div className={styles.field}>
              <label>Marca</label>
              <input type="text" value={resource.equipment.brand} disabled />
            </div>
            <div className={styles.field}>
              <label>Modelo</label>
              <input type="text" value={resource.equipment.model} disabled />
            </div>
            <div className={styles.field}>
              <label>Número de Série</label>
              <input type="text" value={resource.equipment.serial_number} disabled />
            </div>
          </>
        )}

        {resource.room && (
          <div className={styles.field}>
            <label>Capacidade</label>
            <input type="text" value={resource.room.capacity} disabled />
          </div>
        )}

        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.returnButton}>
            Voltar
          </button>
          <button onClick={onConfirm} className={styles.deleteButton}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
