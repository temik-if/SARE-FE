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
          value={"Matutino"}
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
        />

        <FormControlLabel
          className={styles.radioButton}
          value={"Verspertino"}
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
        />

        <FormControlLabel
          className={styles.radioButton}
          value="Noturno"
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
        />
      </RadioGroup>
    </FormControl>
  );
}
