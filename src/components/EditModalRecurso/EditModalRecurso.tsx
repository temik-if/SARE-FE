import React from 'react';
import styles from './EditModalRecurso.module.css';
import { MdModeEdit } from "react-icons/md";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userData: {
    nome: string;
    email: string;
  };
}

export default function EditModal({ isOpen, onClose, onConfirm, userData }: EditModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>EDIÇÃO</h2>
        <div className={styles.field}>
          <label>Marca</label>
          <div className={styles.inputContainer}>
            <input 
              type="text" 
              defaultValue={userData.nome}
              placeholder='Lenovo'
            />
            <MdModeEdit color="#666" size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div className={styles.field}>
          <label>Número de série</label>
          <div className={styles.inputContainer}>
            <input 
              type="text" 
              defaultValue={userData.email}
              placeholder='12345678'
            />
            <MdModeEdit color="#666" size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.editButton}>Editar</button>
          <button onClick={onConfirm} className={styles.returnButton}>Voltar</button>
        </div>
      </div>
    </div>
  );
}