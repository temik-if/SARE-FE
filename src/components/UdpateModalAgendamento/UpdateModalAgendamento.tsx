import React, { useState, useEffect } from 'react';
import styles from './UpdateModalAgendamento.module.css';
import { IBookingUpdate } from "@/types/booking";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedBooking: IBookingUpdate) => void;
  bookingData: IBookingUpdate | null;
}

export default function EditModal({ isOpen, onClose, onConfirm, bookingData }: EditModalProps) {
  const [id, setId] = useState<number | undefined>();
  const [resource_id, setResourceId] = useState<number | undefined>();
  const [shift, setShift] = useState<'MORNING' | 'AFTERNOON' | 'EVENING' | undefined>(undefined);
  const [date, setDate] = useState('');
  const [classList, setClassList] = useState<number[]>([]);
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (bookingData) {
      setId(bookingData.id);
      setResourceId(bookingData.resource_id);
      setShift(bookingData.shift || undefined);
      setDate(bookingData.date || '');
      setClassList(bookingData.class || []);
      setStatus(bookingData.status || '');
    }
  }, [bookingData]);

  const handleShiftChange = (event: SelectChangeEvent) => {
    setShift(event.target.value as 'MORNING' | 'AFTERNOON' | 'EVENING' | undefined);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!resource_id) {
      newErrors.resource_id = "O recurso é obrigatório.";
    }
    if (!shift) {
      newErrors.shift = "O turno é obrigatório.";
    }
    if (!date) {
      newErrors.date = "A data é obrigatória.";
    }
    if (classList.length === 0) {
      newErrors.classList = "Pelo menos uma turma deve ser selecionada.";
    }
    if (!status) {
      newErrors.status = "O status é obrigatório.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    onConfirm({ id, resource_id, shift, date, class: classList, status });
    setSuccessMessage("Agendamento atualizado com sucesso!");
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Agendamento</h2>
        <div className={styles.field}>
          <label>Turno</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "100%" }}>
              <Select
                value={shift || ''}
                onChange={handleShiftChange}
                input={<OutlinedInput notched={false} />}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <MenuItem value="MORNING">Manhã</MenuItem>
                <MenuItem value="AFTERNOON">Tarde</MenuItem>
                <MenuItem value="EVENING">Noite</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {errors.shift && <span className={styles.errorMessage}>{errors.shift}</span>}
        </div>

        <div className={styles.field}>
          <label>Data</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          {errors.date && <span className={styles.errorMessage}>{errors.date}</span>}
        </div>

        <div className={styles.field}>
          <label>Status</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
          {errors.status && <span className={styles.errorMessage}>{errors.status}</span>}
        </div>

        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
