import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import styles from "./SelectMenu.module.css"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



interface ClassSelectMenuProps {
  label: string;
  items: string[];
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}

export default function SelectMenu({label, items, selectedItems, setSelectedItems}: ClassSelectMenuProps) {
  

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;

    const updatedItems = typeof value === "string" ? value.split(",") : value;

    
    const sortedItems = updatedItems.sort((a, b) => {
      const numA = parseInt(a, 10); 
      const numB = parseInt(b, 10);
      return numA - numB; 
    });

    setSelectedItems(sortedItems);
  };

  return (
    <div className={styles.classSelectContainer}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {items.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedItems.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
