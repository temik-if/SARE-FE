"use client";
import React, { useState } from "react";
import styles from "./BookingForm.module.css";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import ShiftRadioGroup from "../ShiftRadioGroup/ShiftRadioGroup";
import ClassSelectMenu from "../ClassSelectMenu/ClassSelectMenu";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedShift, setSelectedShift] = useState("Manhã"); 
  const [selectedClasses, setSelectedClasses] = useState(["1ª", "2ª", "3ª", "4ª", "5ª"]);

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
              <ShiftRadioGroup selectedShift={selectedShift} setSelectedShift={setSelectedShift} />
            </div>
          </div>
          <div>
            <h3>3 - Selecione a(s) aula(s)</h3>
            <ClassSelectMenu selectedItems={selectedClasses} setSelectedItems={setSelectedClasses} />
          </div>
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
