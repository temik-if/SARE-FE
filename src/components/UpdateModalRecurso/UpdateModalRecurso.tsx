"use client";

import React, { useState, useEffect } from "react";
import styles from "./UpdateModalRecurso.module.css";
import { MdEdit } from "react-icons/md";
import { IResource } from "@/types/resource";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource?: IResource | null;
  onUpdate: (updatedData: Partial<IResource>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, resource, onUpdate }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [capacity, setCapacity] = useState("");
  const [errors, setErrors] = useState({ name: "", status: "", serialNumber: "", model: "", brand: "", capacity: "" });

  useEffect(() => {
    if (resource) {
      setName(resource.name || "");
      setStatus(resource.status || "");
      setSerialNumber(resource.equipment?.serial_number || "");
      setModel(resource.equipment?.model || "");
      setBrand(resource.equipment?.brand || "");
      setCapacity(resource.room?.capacity?.toString() || "");
    }
  }, [resource]);

  const validateFields = () => {
    let newErrors = { name: "", status: "", serialNumber: "", model: "", brand: "", capacity: "" };
    if (!name.trim()) newErrors.name = "O nome não pode estar vazio.";
    if (!status.trim()) newErrors.status = "O status não pode estar vazio.";
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleUpdate = () => {
    if (validateFields() && resource) {
      onUpdate({ name, status });
    }
  };

  if (!isOpen || !resource) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Recurso</h2>
        <div className={styles.field}>
          <label>Nome</label>
          <div className={styles.editableField}>
            <input
              type="text"
              value={name}
              className={`${styles.input} ${errors.name ? styles.error : ""}`}
              onChange={(e) => setName(e.target.value)}
            />
            <MdEdit />
          </div>
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label>Status</label>
          <div className={styles.editableField}>
            <input
              type="text"
              value={status}
              className={`${styles.input} ${errors.status ? styles.error : ""}`}
              onChange={(e) => setStatus(e.target.value)}
            />
            <MdEdit />
          </div>
          {errors.status && <span className={styles.errorMessage}>{errors.status}</span>}
        </div>

        {resource.equipment && (
          <>
            <div className={styles.field}>
              <label>Número de Série</label>
              <div className={styles.editableField}>
                <input
                  type="text"
                  value={serialNumber}
                  className={`${styles.input} ${errors.serialNumber ? styles.error : ""}`}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
                <MdEdit />
              </div>
              {errors.serialNumber && <span className={styles.errorMessage}>{errors.serialNumber}</span>}
            </div>

            <div className={styles.field}>
              <label>Modelo</label>
              <div className={styles.editableField}>
                <input
                  type="text"
                  value={model}
                  className={`${styles.input} ${errors.model ? styles.error : ""}`}
                  onChange={(e) => setModel(e.target.value)}
                />
                <MdEdit />
              </div>
              {errors.model && <span className={styles.errorMessage}>{errors.model}</span>}
            </div>

            <div className={styles.field}>
              <label>Marca</label>
              <div className={styles.editableField}>
                <input
                  type="text"
                  value={brand}
                  className={`${styles.input} ${errors.brand ? styles.error : ""}`}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <MdEdit />
              </div>
              {errors.brand && <span className={styles.errorMessage}>{errors.brand}</span>}
            </div>
          </>
        )}

        {resource.room && (
          <div className={styles.field}>
            <label>Capacidade</label>
            <div className={styles.editableField}>
              <input
                type="number"
                value={capacity}
                className={`${styles.input} ${errors.capacity ? styles.error : ""}`}
                onChange={(e) => setCapacity(e.target.value)}
              />
              <MdEdit />
            </div>
            {errors.capacity && <span className={styles.errorMessage}>{errors.capacity}</span>}
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button className={styles.saveButton} onClick={handleUpdate}>Salvar</button>
          <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
