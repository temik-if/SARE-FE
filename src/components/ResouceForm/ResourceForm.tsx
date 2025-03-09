'use client'

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './ResourceForm.module.css';
import SelectMenuResource from '../SelectMenuResource/SelectMenuResource';
interface FormDataSala {
  resource: string;
  serial_number: string;
  model: string;
}

interface FormDataResource {
  resource: string;
  name: string;
  Capacity: string;
}

type FormData = FormDataSala | FormDataResource;


export default function UserForm() {
  const [formDataResource, setFormDataResource] = useState({
    resource:'',
    serial_number: '',
    model: '',
  });

  const [formDataSala, setFormDataSala] = useState({
    resource: '',
    name:'',
    Capacity:'',
  });

  const [errors, setErrors] = useState({
    serial_number: '',
    model: '',
    resource: '',
    name:'',
    Capacity:'',

  });

  const mockedResources = ["Notebook", "Projetor", "Sala"];
  const resources = mockedResources;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>(
    selectedResources[0] === 'Sala' ? formDataSala : formDataResource
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      serial_number: '',
      model: '',
      resource: '',
      name:'',
      Capacity:'',
    };

    

    setErrors(newErrors);

    
    if (!Object.values(newErrors).some(error => error !== '')) {
      setShowSuccessPopup(true);
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
                      items={resources}
                      selectedItems={selectedResources}
                      setSelectedItems={setSelectedResources}
                    />
              </div>
            {
            selectedResources.length > 0 ?
              <div className={styles.formGroup}>
                {selectedResources[0] === 'Sala' ?

                <div className={styles.formGroup}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Nome</label>
                      <input
                        type="text"
                        name="model"
                        placeholder="Laboratório de Informática"
                        value={formDataResource.model}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.model ? styles.error : ''}`}
                      />
                    </div>{/*nome  */}
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Capacidade Máxima</label>
                      <input
                        type="number"
                        name="Capacity"
                        placeholder="1"
                        value={formDataSala.Capacity}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.Capacity ? styles.error : ''}`}
                      />
                    </div>{/*capacidade  */}
                </div>
              
              :

              <div className={styles.formGroup}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Marca</label>
                    <input
                      type="text"
                      name="model"
                      placeholder="Lenovo"
                      value={formDataResource.model}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.model ? styles.error : ''}`}
                    />
                  </div> {/*marca  */}
                    

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Numero de Serie</label>
                    <input
                      type="text"
                      name="serial_number"
                      placeholder="12543987"
                      value={formDataResource.serial_number}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.serial_number ? styles.error : ''}`}
                    />
                  </div> {/*num serie  */}
              </div> 
            }
              </div> : null
            }
                    
            <button type="submit" className={styles.submitButton}>
              Cadastrar
            </button>
          </form>
        </div>
        {/* <button onClick={()=> console.log(selectedResources)}>
              Cadastrar
            </button> */}

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