import React from 'react';
import styles from './BookingModal.module.css'

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: { date: string, shift: string, classes: string, resources: string};
}
export default function BookingModal({isOpen, onClose, onConfirm, data}: ConfirmationModalProps) {
    if (!isOpen) return null;

     const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
       if (e.target === e.currentTarget) {
         onClose(); 
       }
     };

    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modal}>
          <h2 className={styles.title}>Deseja confirmar o agendamento?</h2>

          <label className={styles.label}>Data</label>
          <input className={styles.input} type="text" readOnly value={data.date} />

          <label className={styles.label}>Turno</label>
          <input className={styles.input} type="text" readOnly value={data.shift} />

          <label className={styles.label}>Aulas</label>
          <input className={styles.input} type="text" readOnly value={data.classes} />

          <label className={styles.label}>Recursos</label>
          <input className={styles.input} type="text" readOnly value={data.resources} />

          <div className={styles.buttons}>
            <button className={styles.confirm} onClick={onConfirm}>
              Sim, confirmo.
            </button>
            <button className={styles.cancel} onClick={onClose}>
              Não, desejo retornar
            </button>
          </div>
        </div>
      </div>
    );
}