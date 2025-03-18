'use client';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './UserForm.module.css';
import { userService } from '@/service/userService';
import { IUserCreate } from '@/types/user'; 

export default function UserForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Nome é obrigatório';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Sobrenome é obrigatório';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error !== '')) {
      const userData: IUserCreate = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        type: 'TEACHER' // Altere conforme necessário
      };

      try {
        await userService.createUser(userData);
        setShowSuccessPopup(true);
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar usuário. Tente novamente.');
      }
    }
  };

  return (
    <>
      <div className={`${styles.formContainer} ${showSuccessPopup ? styles.blur : ''}`}>
        <h2 className={styles.formTitle}>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome</label>
            <input
              type="text"
              name="first_name"
              placeholder="Maria"
              value={formData.first_name}
              onChange={handleChange}
              className={`${styles.input} ${errors.first_name ? styles.error : ''}`}
            />
            {errors.first_name && <span className={styles.errorMessage}>{errors.first_name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Sobrenome</label>
            <input
              type="text"
              name="last_name"
              placeholder="Oliveira da Silva"
              value={formData.last_name}
              onChange={handleChange}
              className={`${styles.input} ${errors.last_name ? styles.error : ''}`}
            />
            {errors.last_name && <span className={styles.errorMessage}>{errors.last_name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="mariaoliveira@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={`${styles.formGroup} ${styles.passwordGroup}`}>
            <label className={styles.label}>Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.error : ''}`}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?  <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          <div className={`${styles.formGroup} ${styles.passwordGroup}`}>
            <label className={styles.label}>Confirmar Senha</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="******"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className={styles.submitButton}>
            Cadastrar
          </button>
        </form>
      </div>

      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Cadastro Realizado!</h3>
            <p>Seu cadastro foi concluído com sucesso.</p>
            <button className={styles.popupButton} onClick={() => setShowSuccessPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
