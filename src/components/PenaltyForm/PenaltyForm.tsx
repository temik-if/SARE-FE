'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/service/userService';
import { penaltyService } from '@/service/penaltyService';
import { IUser } from "@/types/user";
import { IPenalty } from "@/types/penalty"; 
import styles from './PenaltyForm.module.css';
import { MenuItem, Select, FormControl, OutlinedInput, Box, Badge, Tooltip, SelectChangeEvent } from '@mui/material';

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
    const fetchUsersWithPenalties = async () => {
      try {
        const usersResponse: IUser[] = await userService.getAll();
        const penaltiesResponse: IPenalty[] = await penaltyService.getAll();

        const penaltiesMap: Record<string, number> = {};

        penaltiesResponse.forEach((penalty) => {
          penaltiesMap[penalty.user_id] = (penaltiesMap[penalty.user_id] || 0) + 1;
        });

        const usersWithPenalties = usersResponse.map((user) => ({
          ...user,
          penalties: penaltiesMap[user.id] || 0,
        }));

        setUsers(usersWithPenalties);
      } catch (error) {
        console.error('Erro ao buscar usuários e penalidades:', error);
      }
    };

    fetchUsersWithPenalties();
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

    // Validação dos campos do formulário
    const newErrors = {
      userId: formData.userId ? '' : 'Usuário é obrigatório',
      description: formData.description.trim() ? '' : 'Descrição é obrigatória',
      days: formData.days ? '' : 'Quantidade de dias é obrigatória'
    };

    setErrors(newErrors);

    // Se houver erro, não faz a requisição
    if (Object.values(newErrors).some((error) => error !== '')) return;

    try {
      // Criar objeto com os dados para enviar para a API
      const penaltyData = {
        user_id: formData.userId,
        description: formData.description,
        duration: parseInt(formData.days, 10)
      };

      // Enviar a penalidade usando o serviço
      const result = await penaltyService.createPenalty(penaltyData);
      console.log('Penalidade criada:', result);

      // Redirecionar para outra página após sucesso
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
              <MenuItem key={user.id} value={user.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>{user.first_name} {user.last_name}</span>

                {/* Se o usuário tiver penalidades, mostra a bolinha */}
                {user.penalties !== undefined && user.penalties > 0 && (
                  <Tooltip title={`Este usuário tem ${user.penalties} penalidade(s)`} arrow>
                    <Badge
                      badgeContent={user.penalties}
                      color="error"
                      sx={{
                        marginLeft: "10px",
                        "& .MuiBadge-badge": { fontSize: "0.75rem" }
                      }}
                    />
                  </Tooltip>
                )}
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
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: '100%' }}>
              <Select
                name="days"
                value={formData.days}
                onChange={handleSelectChange}
                input={<OutlinedInput notched={false} />}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                }}
              >
                <MenuItem value="2">2 dias</MenuItem>
                <MenuItem value="5">5 dias</MenuItem>
                <MenuItem value="7">7 dias</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {errors.days && <span className={styles.errorMessage}>{errors.days}</span>}
        </div>

        <button type="submit" className={styles.submitButton}>Aplicar Penalidade</button>
      </form>
    </div>
  );
}
