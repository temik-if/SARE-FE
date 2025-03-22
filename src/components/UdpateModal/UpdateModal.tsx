"use client";

import React, { useState, useEffect } from "react";
import styles from "./UpdateModal.module.css";
import { UserUpdate } from "@/types/user";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MdEdit } from "react-icons/md";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedUser: UserUpdate) => void;
  userData: UserUpdate | null;
}

export default function EditModal({
  isOpen,
  onClose,
  onConfirm,
  userData,
}: EditModalProps) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"TEACHER" | "COORDINATOR" | "">("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Estado para armazenar erros

  useEffect(() => {
    if (userData) {
      setFirst_name(userData.first_name || "");
      setLast_name(userData.last_name || "");
      setEmail(userData.email || "");
      setType(userData.type || "");
    }
  }, [userData]);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as "TEACHER" | "COORDINATOR");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validação do nome
    if (!first_name) {
      newErrors.first_name = "O nome é obrigatório.";
    }

    // Validação do sobrenome
    if (!last_name) {
      newErrors.lastName = "O sobrenome é obrigatório.";
    }

    // Validação do email
    if (!email) {
      newErrors.email = "O email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "O email é inválido.";
    }

    if (!type) {
      newErrors.type = "O tipo de usuário é obrigatório.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    onConfirm({
      first_name,
      last_name,
      email,
      type: type as "TEACHER" | "COORDINATOR",
    });
    setSuccessMessage("Dados atualizados com sucesso!");
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>EDIÇÃO</h2>
        <div className={styles.field}>
          <label>Nome</label>
          <div className={styles.editableField}>
            <input
              type="text"
              value={first_name}
              className={`${styles.input} ${
                errors.first_name ? styles.error : ""
              }`}
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <MdEdit />
          </div>
          {errors.first_name && (
            <span className={styles.errorMessage}>{errors.first_name}</span>
          )}
        </div>

        <div className={styles.field}>
          <label>Sobrenome</label>
          <div className={styles.editableField}>
            <input
              type="text"
              value={last_name}
              className={`${styles.input} ${
                errors.last_name ? styles.error : ""
              }`}
              onChange={(e) => setLast_name(e.target.value)}
            />
            <MdEdit />
          </div>
          {errors.lastName && (
            <span className={styles.errorMessage}>{errors.lastName}</span>
          )}
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <div className={styles.editableField}>
            <input
              type="email"
              value={email}
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEdit />
          </div>
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.field}>
          <label>Tipo de Usuário</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "100%" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type || ""}
                label="Tipo"
                onChange={handleTypeChange}
                input={<OutlinedInput notched={false} />}
                sx={{
                  fontFamily: "var(--secondary-font)",
                  fontSize: "1.2rem",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ddd",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ddd",
                  },
                }}
              >
                <MenuItem
                  sx={{
                    fontFamily: "var(--secondary-font)",
                    fontSize: "1.2rem",
                  }}
                  value="TEACHER"
                >
                  Professor
                </MenuItem>
                <MenuItem
                  sx={{
                    fontFamily: "var(--secondary-font)",
                    fontSize: "1.2rem",
                  }}
                  value="COORDINATOR"
                >
                  Coordenador
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {errors.type && (
            <span className={styles.errorMessage}>{errors.type}</span>
          )}
        </div>

        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.saveButton}>
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
