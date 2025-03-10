'use client'

import React, { useState, useEffect } from 'react';
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
  
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const mockedResources = ['Notebook', 'Projetor', 'Sala'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedResource === 'Sala') {
      setFormDataSala(prev => ({ ...prev, [name]: value }));
    } else {
      setFormDataResource(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const isFormValid = selectedResource === 'Sala'
    ? formDataSala.name && formDataSala.Capacity
    : formDataResource.serial_number && formDataResource.model && formDataResource.brand;

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
                  <input
                    type="text"
                    name="name"
                    placeholder="Laboratório de Informática"
                    value={formDataSala.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <label className={styles.label}>Capacidade Máxima</label>
                  <input
                    type="number"
                    name="Capacity"
                    placeholder="1"
                    value={formDataSala.Capacity}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </>
              ) : (
                <>
                  <label className={styles.label}>Marca</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Lenovo"
                    value={formDataResource.brand}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <label className={styles.label}>Modelo</label>
                  <input
                    type="text"
                    name="model"
                    placeholder="ThinkPad"
                    value={formDataResource.model}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <label className={styles.label}>Número de série</label>
                  <input
                    type="text"
                    name="serial_number"
                    placeholder="12543987"
                    value={formDataResource.serial_number}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </>
              )}
            </div>
          )}
          <button type="submit" className={styles.submitButton} disabled={!isFormValid}>
            Cadastrar
          </button>
        </form>
      </div>
      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Cadastro Realizado!</h3>
            <p>Seu cadastro foi concluído com sucesso.</p>
            <button
              className={styles.popupButton}
              onClick={() => setShowSuccessPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
