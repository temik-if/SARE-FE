import React from 'react';
import styles from './DeleteModal.module.css';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userData: {
    nome: string;
    email: string;
  };
}

export default function DeleteModal({ isOpen, onClose, onConfirm, userData }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Deseja excluir o usuário?</h2>
        <div className={styles.field}>
          <label>Nome Completo</label>
          <input type="text" value={userData.nome} disabled />
        </div>
        <div className={styles.field}>
          <label>Email</label>
          <input type="email" value={userData.email} disabled />
        </div>
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.returnButton}>Voltar</button>
          <button onClick={onConfirm} className={styles.deleteButton}>Excluir</button>
        </div>
      </div>
    </div>
  );
}
