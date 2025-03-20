"use client";

import React from 'react';
import styles from './DeleteModalAgendamento.module.css';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingData: {
    id: number;
    resource_id: number;
    date: string;
    shift: 'MORNING' | 'AFTERNOON' | 'EVENING';
    status: string;
  };
}

export default function DeleteModal({ isOpen, onClose, onConfirm, bookingData }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Deseja excluir este agendamento?</h2>
        <div className={styles.field}>
          <label>Recurso</label>
          <input type="text" value={bookingData.resource_id} disabled />
        </div>
        <div className={styles.field}>
          <label>Data</label>
          <input type="text" value={bookingData.date} disabled />
        </div>
        <div className={styles.field}>
          <label>Turno</label>
          <input type="text" value={bookingData.shift} disabled />
        </div>
        <div className={styles.field}>
          <label>Turno</label>
          <input type="text" value={bookingData.status} disabled />
        </div>
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.returnButton}>Voltar</button>
          <button onClick={onConfirm} className={styles.deleteButton}>Excluir</button>
        </div>
      </div>
    </div>
  );
}
