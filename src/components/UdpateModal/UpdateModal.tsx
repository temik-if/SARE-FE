"use client";

import React, { useState, useEffect } from 'react';
import styles from './UpdateModal.module.css';
import { UserUpdate } from "@/types/user";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

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

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');  // Certifique-se de que a variável esteja correta
      setLastName(userData.lastName || '');    // Certifique-se de que a variável esteja correta
      setEmail(userData.email || '');
      setType(userData.type || '');
    }
  }, [userData]);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as 'TEACHER' | 'COORDINATOR');
  };

  const validateForm = () => {
    if (!firstName || !lastName || !email || !type) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios antes de enviar.");
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Passe os valores com o nome correto da propriedade (first_Name, last_Name, etc.)
    onConfirm({ firstName: firstName, lastName: lastName, email, type: type as "TEACHER" | "COORDINATOR" });
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
        <h2>Editar Usuário</h2>
        
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <div className={styles.field}>
          <label>Nome</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Sobrenome</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
        </div>
        
        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
