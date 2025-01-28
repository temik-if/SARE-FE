import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import styles from "./ShiftRadioGroup.module.css";

export default function ShiftRadioGroup() {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <div className={styles.radioContainer}>
          <FormControlLabel
            className={styles.radioButton}
            value="female"
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
        </div>
        <div className={styles.radioContainer}>
          <FormControlLabel
            className={styles.radioButton}
            value="male"
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
        </div>
        <div className={styles.radioContainer}>
          <FormControlLabel
            className={styles.radioButton}
            value="other"
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
        </div>
      </RadioGroup>
    </FormControl>
  );
}
