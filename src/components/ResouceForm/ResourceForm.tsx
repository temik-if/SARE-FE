'use client';

import React, { useState } from 'react';
import styles from './ResourceForm.module.css';
import SelectMenuResource from '../SelectMenuResource/SelectMenuResource';
import { resourceService } from '@/service/resourceService';
import { IResourceCreate } from '@/types/resource';

interface FormDataSala {
  name: string;
  Capacity: string;
}

interface FormDataResource {
  serial_number: string;
  model: string;
  brand: string;
}

type FormData = FormDataSala | FormDataResource;

export default function ResourceForm() {
  const [selectedResource, setSelectedResource] = useState<string>('');
  const [status] = useState<string>('AVAILABLE');

  const [formDataResource, setFormDataResource] = useState<FormDataResource>({
    serial_number: '',
    model: '',
    brand: '',
  });
  const [formDataSala, setFormDataSala] = useState<FormDataSala>({
    name: '',
    Capacity: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const mockedResources = ['Notebook', 'Projetor', 'Sala'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' })); // Limpa o erro ao digitar

    if (selectedResource === 'Sala') {
      setFormDataSala((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormDataResource((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (selectedResource === 'Sala') {
      if (!formDataSala.name) newErrors.name = 'O nome é obrigatório';
      if (!formDataSala.Capacity) newErrors.Capacity = 'A capacidade é obrigatória';
    } else {
      if (!formDataResource.brand) newErrors.brand = 'A marca é obrigatória';
      if (!formDataResource.model) newErrors.model = 'O modelo é obrigatório';
      if (!formDataResource.serial_number) newErrors.serial_number = 'O número de série é obrigatório';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    let formattedData: IResourceCreate;
    if (selectedResource === 'Sala') {
      formattedData = {
        name: formDataSala.name,
        status,
        room: {
          capacity: Number(formDataSala.Capacity),
        },
      };
    } else {
      formattedData = {
        name: selectedResource,
        status,
        equipment: {
          serial_number: formDataResource.serial_number,
          model: formDataResource.model,
          brand: formDataResource.brand,
        },
      };
    }

    try {
      await resourceService.createResource(formattedData);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Erro ao cadastrar recurso:', error);
    }
  };

  return (
    <>
      <div className={`${styles.formContainer} ${showSuccessPopup ? styles.blur : ''}`}>
        <h2 className={styles.formTitle}>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Recursos</label>
            <SelectMenuResource
              label="Selecione"
              items={mockedResources}
              selectedItems={[selectedResource]}
              setSelectedItems={([resource]) => setSelectedResource(resource)}
            />
          </div>
          {selectedResource && (
            <div className={styles.formGroup}>
              {selectedResource === 'Sala' ? (
                <>
                  <label className={styles.label}>Nome</label>
                  <input type="text" name="name" placeholder="Laboratório de Informática" value={formDataSala.name} onChange={handleChange} className={styles.input} />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                  <label className={styles.label}>Capacidade Máxima</label>
                  <input type="number" name="Capacity" placeholder="1" value={formDataSala.Capacity} onChange={handleChange} className={styles.input} />
                  {errors.Capacity && <span className={styles.e}>{errors.Capacity}</span>}
                </>
              ) : (
                <>
                  <label className={styles.label}>Marca</label>
                  <input type="text" name="brand" placeholder="Lenovo" value={formDataResource.brand} onChange={handleChange} className={styles.input} />
                  {errors.brand && <span className={styles.error}>{errors.brand}</span>}
                  <label className={styles.label}>Modelo</label>
                  <input type="text" name="model" placeholder="ThinkPad" value={formDataResource.model} onChange={handleChange} className={styles.input} />
                  {errors.model && <span className={styles.error}>{errors.model}</span>}
                  <label className={styles.label}>Número de série</label>
                  <input type="text" name="serial_number" placeholder="12543987" value={formDataResource.serial_number} onChange={handleChange} className={styles.input} />
                  {errors.serial_number && <span className={styles.error}>{errors.serial_number}</span>}
                </>
              )}
            </div>
          )}
          <button type="submit" className={styles.submitButton}>Cadastrar</button>
        </form>
      </div>
      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Cadastro Realizado!</h3>
            <p>Seu cadastro foi concluído com sucesso.</p>
            <button className={styles.popupButton} onClick={() => { setShowSuccessPopup(false); window.location.reload(); }}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}