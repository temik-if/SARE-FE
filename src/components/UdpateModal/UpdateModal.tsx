"use client";

import React, { useState, useEffect } from 'react';
import styles from './UpdateModal.module.css';
import { UserUpdate } from "@/types/user";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MdEdit } from "react-icons/md";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedUser: UserUpdate) => void;
  userData: UserUpdate | null;
}

export default function EditModal({ isOpen, onClose, onConfirm, userData }: EditModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'TEACHER' | 'COORDINATOR' | ''>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Estado para armazenar erros

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setEmail(userData.email || '');
      setType(userData.type || '');
    }
  }, [userData]);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as 'TEACHER' | 'COORDINATOR');
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validação do nome
    if (!firstName) {
      newErrors.firstName = "O nome é obrigatório.";
    }

    // Validação do sobrenome
    if (!lastName) {
      newErrors.lastName = "O sobrenome é obrigatório.";
    }

    // Validação do email
    if (!email) {
      newErrors.email = "O email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "O email é inválido.";
    }

    // Validação do tipo de usuário
    if (!type) {
      newErrors.type = "O tipo de usuário é obrigatório.";
    }

    setErrors(newErrors); // Atualiza o estado de erros

    // Retorna true se não houver erros
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return; // Se houver erros, não prossegue

    onConfirm({ firstName, lastName, email, type: type as "TEACHER" | "COORDINATOR" });
    setSuccessMessage("Dados atualizados com sucesso!");
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edição</h2>
        <div className={styles.field}>
          <label>Nome</label>
          <div className={styles.editableField}>
            <input
              type="text"
              value={firstName}
              className={`${styles.input} ${errors.firstName ? styles.error : ''}`}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <MdEdit />
          </div>
          {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
        </div>

        <div className={styles.field}>
          <label>Sobrenome</label>
          <div className={styles.editableField}>
            <input
              type="text"
              value={lastName}
              className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
              onChange={(e) => setLastName(e.target.value)}
            />
            <MdEdit />
          </div>
          {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <div className={styles.editableField}>
            <input
              type="email"
              value={email}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEdit />
          </div>
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label>Tipo de Usuário</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "100%" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type || ''}
                label="Tipo"
                onChange={handleTypeChange}
                input={<OutlinedInput notched={false} />}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                }}
              >
                <MenuItem value="TEACHER">Professor</MenuItem>
                <MenuItem value="COORDINATOR">Coordenador</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {errors.type && <span className={styles.errorMessage}>{errors.type}</span>}
        </div>

        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.saveButton}>Editar</button>
        </div>
      </div>
    </div>
  );
}