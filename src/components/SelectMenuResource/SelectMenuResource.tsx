import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import styles from "./SelectMenuResource.module.css";

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

export default function SelectMenu({
  label,
  items,
  selectedItems,
  setSelectedItems,
}: ClassSelectMenuProps) {
  
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
      <FormControl sx={{ width: "100%" }}>
        <InputLabel  id="demo-multiple-checkbox-label" sx={{
      "&.Mui-focused": { 'display': "none" }, 
      "&.Mui-blurred": { 'display': "none" }
    }}>{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput notched={false} />} // ⚠️ Removemos o `label`
          displayEmpty
          renderValue={(selected) => (selected.length > 0 ? selected.join(", ") : "Selecione")}
          MenuProps={MenuProps}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", 
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" }, 
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
          }}
        > 
          {items.map((item) => (
            <MenuItem
              key={item}
              value={item}
              className={
                selectedItems.includes(item) ? styles.selectedItem : ""
              }
            >
              <ListItemText primary={item} />
              <Checkbox
                sx={{
                  color: selectedItems.includes(item) ? "#50a151" : "default",
                  "&.Mui-checked": {
                    color: "#fff",
                  },
                }}
                checked={selectedItems.includes(item)}
              />
              
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
