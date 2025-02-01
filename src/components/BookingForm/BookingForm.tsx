"use client";
import React, { useState } from "react";
import styles from "./BookingForm.module.css";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import ShiftRadioGroup from "../ShiftRadioGroup/ShiftRadioGroup";
import SelectMenu from "../ClassSelectMenu/SelectMenu";

const classes = ["1ª", "2ª", "3ª", "4ª", "5ª"];
const mockedResources = ["Notebook", "Projetor", "Laboratório de Ciências"];

export default function BookingForm() {
  const resources = mockedResources;
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedShift, setSelectedShift] = useState("Matutino");
  const [selectedClasses, setSelectedClasses] = useState([
    "1ª",
    "2ª",
    "3ª",
    "4ª",
    "5ª",
  ]);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  const handleSubmit = () => {
    if (selectedResources.length > 0 && selectedClasses.length > 0) {
      console.log("Submitting form");
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} action="submit">
        <div className={styles.formSection}>
          <div className={styles.datePickerContainer}>
            <h3>1 - Selecione uma data</h3>
            <DatePicker
              disablePast
              slotProps={{
                textField: {
                  style: {
                    paddingLeft: "12px",
                    paddingRight: "12px",
                  },
                },
                openPickerIcon: {
                  style: {
                    color: "#EB7633",
                  },
                },
              }}
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
          <div>
            <h3>2 - Selecione um turno</h3>
            <div>
              <ShiftRadioGroup
                selectedShift={selectedShift}
                setSelectedShift={setSelectedShift}
              />
            </div>
          </div>
          <div>
            <h3>3 - Selecione a(s) aula(s)</h3>
            <SelectMenu
              label="Aula"
              items={classes}
              selectedItems={selectedClasses}
              setSelectedItems={setSelectedClasses}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <div>
            <h3>3 - Selecione o(s) recurso(s)</h3>
            {selectedClasses.length === 0 ? (
              <div>
                <h3 className={styles.infoMessage}>
                  {" "}
                  Selecione pelo menos uma aula.
                </h3>
              </div>
            ) : resources.length === 0 ? (
              <div>
                <h3 className={styles.infoMessage}>
                  Não há recursos disponíveis para esta data e horário.
                </h3>
              </div>
            ) : (
              <SelectMenu
                label="Selecione"
                items={resources}
                selectedItems={selectedResources}
                setSelectedItems={setSelectedResources}
              />
            )}
          </div>
        </div>
      </form>
      <ButtonPrimary
        isDisabled={
          !(selectedClasses.length > 0 && selectedResources.length > 0)
        }
        type="submit"
        label="REALIZAR AGENDAMENTO"
        onClick={handleSubmit}
      />
    </div>
  );
}
