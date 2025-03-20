import React, { useState, useEffect } from 'react';
import styles from './UpdateModalAgendamento.module.css';
import { IBookingUpdate } from "@/types/booking";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { userService } from "@/service/userService";
import { resourceService } from "@/service/resourceService";
import { MdEdit } from 'react-icons/md'; // Importando o ícone de edição

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedBooking: IBookingUpdate) => void;
  bookingData: IBookingUpdate | null;
}

export default function EditModal({ isOpen, onClose, onConfirm, bookingData }: EditModalProps) {
  const [id, setId] = useState<number | undefined>();
  const [resource_id, setResourceId] = useState<number | undefined>();
  const [shift, setShift] = useState<'MORNING' | 'AFTERNOON' | 'EVENING' | ''>('');
  const [date, setDate] = useState('');
  const [classList, setClassList] = useState<number[]>([]);
  const [status, setStatus] = useState('');
  const [userName, setUserName] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (bookingData) {
      setId(bookingData.id);
      setResourceId(bookingData.resource_id);
      setShift(bookingData.shift || '');
      setDate(bookingData.date || '');
      setClassList(bookingData.class || []);
      setStatus(bookingData.status || '');

      // Buscar o nome do usuário
      if (bookingData.user_id) {
        userService.getById(bookingData.user_id.toString()).then(user => {
          setUserName(user.first_name + ' ' + user.last_name);
        }).catch(error => {
          console.error("Erro ao buscar usuário:", error);
        });
      }

      // Buscar o nome do recurso
      if (bookingData.resource_id) {
        resourceService.getById(bookingData.resource_id.toString()).then(resource => {
          setResourceName(resource.name);
        }).catch(error => {
          console.error("Erro ao buscar recurso:", error);
        });
      }
    }
  }, [bookingData]);

  const handleShiftChange = (event: SelectChangeEvent) => {
    setShift(event.target.value as 'MORNING' | 'AFTERNOON' | 'EVENING' | '');
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
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

  // const handleSave = () => {
  //   if (!validateForm()) return;

  //   onConfirm({ id, resource_id, shift, date, class: classList, status });
  //   setSuccessMessage("Agendamento atualizado com sucesso!");
  //   setTimeout(() => {
  //     setSuccessMessage('');
  //     onClose();
  //   }, 2000);
  // };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Agendamento</h2>

        {/* Campo para o nome do usuário */}
        <div className={styles.field}>
          <label>Usuário</label>
          <div className={styles.editableField}>
            <input
              type="text"
              value={userName}
              className={`${styles.input} ${errors.userName ? styles.error : ''}`}
              disabled
            />
          </div>
          {errors.userName && <span className={styles.errorMessage}>{errors.userName}</span>}
        </div>

        {/* Campo para o nome do recurso */}
        <div className={styles.field}>
          <label>Recurso</label>
          <div className={styles.editableField}>
            <input
              type="text"
              value={resourceName}
              className={`${styles.input} ${errors.resourceName ? styles.error : ''}`}
              disabled
            />
          </div>
          {errors.resourceName && <span className={styles.errorMessage}>{errors.resourceName}</span>}
        </div>

        {/* Campo para o turno */}
        <div className={styles.field}>
          <label>Turno</label>
            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="shift-select-label"
                  id="shift-select"
                  value={shift}
                  onChange={handleShiftChange}
                  input={<OutlinedInput notched={false} />}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  }}
                  className={`${styles.input} ${errors.shift ? styles.error : ''}`}
                >
                  <MenuItem value="MORNING">Manhã</MenuItem>
                  <MenuItem value="AFTERNOON">Tarde</MenuItem>
                  <MenuItem value="EVENING">Noite</MenuItem>
                </Select>
              </FormControl>
            </Box>
          {errors.shift && <span className={styles.errorMessage}>{errors.shift}</span>}
        </div>

        {/* Campo para a data */}
        <div className={styles.field}>
          <label>Data</label>
          <div className={styles.editableField}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${styles.input} ${errors.date ? styles.error : ''}`}
            />
          </div>
          {errors.date && <span className={styles.errorMessage}>{errors.date}</span>}
        </div>

         {/* Campo para o status */}
         <div className={styles.field}>
          <label>Status</label>
            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={status}
                  onChange={handleStatusChange}
                  input={<OutlinedInput notched={false} />}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  }}
                  className={`${styles.input} ${errors.status ? styles.error : ''}`}
                >
                  <MenuItem value="IN_PROGRESS">Em Andamento</MenuItem>
                  <MenuItem value="COMPLETED">Concluído</MenuItem>
                  <MenuItem value="CLOSED">Fechado</MenuItem>
                </Select>
              </FormControl>
            </Box>
          {errors.status && <span className={styles.errorMessage}>{errors.status}</span>}
        </div>
        <div className={styles.buttons}>
          {/* <button onClick={handleSave} className={styles.saveButton}>Salvar</button> */}
          <button className={styles.saveButton}>Salvar</button>

        </div>
      </div>
    </div>
  );
}