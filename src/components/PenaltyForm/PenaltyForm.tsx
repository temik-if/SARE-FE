'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/service/userService';
import { IUser } from "@/types/user";
import styles from './PenaltyForm.module.css';
import { MenuItem, Select, FormControl, OutlinedInput, Box, SelectChangeEvent } from '@mui/material';

export default function PenaltyForm() {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [formData, setFormData] = useState({
    userId: '',
    description: '',
    days: ''
  });

  const [errors, setErrors] = useState({
    userId: '',
    description: '',
    days: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: IUser[] = await userService.getAll();
        setUsers(response);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name as keyof typeof formData]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      userId: formData.userId ? '' : 'Usuário é obrigatório',
      description: formData.description.trim() ? '' : 'Descrição é obrigatória',
      days: formData.days ? '' : 'Quantidade de dias é obrigatória'
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== '')) return;

    try {
      console.log('Enviando dados:', formData);
      router.push('/');
    } catch (error) {
      console.error('Erro ao cadastrar penalidade:', error);
      alert('Erro ao cadastrar penalidade. Tente novamente.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Aplicar Penalidade</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Usuário</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: '100%' }}>
              <Select
                name="userId"
                value={formData.userId}
                onChange={handleSelectChange}
                input={<OutlinedInput notched={false} />}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {errors.userId && <span className={styles.errorMessage}>{errors.userId}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descrição da Penalidade</label>
          <input
            type="text"
            name="description"
            placeholder="Descreva a penalidade"
            value={formData.description}
            onChange={handleChange}
            className={`${styles.input} ${errors.description ? styles.error : ''}`}
          />
          {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Quantidade de Dias</label>
          <input
            type="number"
            name="days"
            placeholder="Número de dias"
            value={formData.days}
            onChange={handleChange}
            className={`${styles.input} ${errors.days ? styles.error : ''}`}
          />
          {errors.days && <span className={styles.errorMessage}>{errors.days}</span>}
        </div>

        <button type="submit" className={styles.submitButton}>Aplicar Penalidade</button>
      </form>
    </div>
  );
}
