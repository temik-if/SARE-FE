import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import styles from "./ShiftRadioGroup.module.css";

interface ShiftRadioGroupProps {
  selectedShift: string;
  setSelectedShift: (shift: string) => void;
}

export default function ShiftRadioGroup({
  selectedShift,
  setSelectedShift,
}: ShiftRadioGroupProps) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        className={styles.radioButtonContainer}
        value={selectedShift}
        onChange={(event) => setSelectedShift(event.target.value)}
      >
        <FormControlLabel
          value="Matutino"
          className={styles.radioButton}
          control={
            <Radio
              sx={{
                "&.Mui-checked": {
                  color: "#E56217",
                },
              }}
              className={styles.radioButtonIcon}
            />
          }
          label="Matutino"
          sx={{
            width: "150px", // Certifique-se de que a largura fixa seja aplicada
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.3s ease", // Adiciona transição suave
            "& .MuiFormControlLabel-label": {
              color:
                selectedShift === "Matutino" ? "var(--primary)" : "inherit",
              fontWeight: selectedShift === "Matutino" ? "bold" : "inherit",
            },
          }}
        />

        <FormControlLabel
          value="Vespertino"
          className={styles.radioButton}
          control={
            <Radio
              sx={{
                "&.Mui-checked": {
                  color: "#E56217",
                },
              }}
              className={styles.radioButtonIcon}
            />
          }
          label="Vespertino"
          sx={{
            width: "150px", // Certifique-se de que a largura fixa seja aplicada
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.3s ease", // Adiciona transição suave
            "& .MuiFormControlLabel-label": {
              color:
                selectedShift === "Vespertino" ? "var(--primary)" : "inherit",
              fontWeight: selectedShift === "Vespertino" ? "bold" : "inherit",
            },
          }}
        />

        <FormControlLabel
          value="Noturno"
          className={styles.radioButton}
          control={
            <Radio
              sx={{
                "&.Mui-checked": {
                  color: "#E56217",
                },
              }}
              className={styles.radioButtonIcon}
            />
          }
          label="Noturno"
          sx={{
            width: "150px", // Certifique-se de que a largura fixa seja aplicada
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.3s ease", // Adiciona transição suave
            "& .MuiFormControlLabel-label": {
              color: selectedShift === "Noturno" ? "var(--primary)" : "inherit",
              fontWeight: selectedShift === "Noturno" ? "bold" : "inherit",
            },
          }}
        />
      </RadioGroup>
    </FormControl>
  );
}
