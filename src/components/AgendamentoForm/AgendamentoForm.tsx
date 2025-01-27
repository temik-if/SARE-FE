"use client"
import React from "react";
import styles from "./AgendamentoForm.module.css";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";

export default function AgendamentoForm() {
  return (
    <div className={styles.container}>
      <form className={styles.form} action="submit">
        <div className={styles.formSection}>
          <div>Date select</div>
          <div>Shift select</div>
          <div>Class select</div>
        </div>

        <div className={styles.formSection}>
          <div>Resource select</div>
        </div>
      </form>
      <ButtonPrimary
        type="submit"
        label="REALIZAR AGENDAMENTO"
        onClick={() => {}}
      />
    </div>
  );
}
