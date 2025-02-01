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
          value={"Manhã"}
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
          label="Manhã"
        />

        <FormControlLabel
          className={styles.radioButton}
          value={"Tarde"}
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
          label="Tarde"
        />

        <FormControlLabel
          className={styles.radioButton}
          value="Noite"
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
          label="Noite"
        />
      </RadioGroup>
    </FormControl>
  );
}
