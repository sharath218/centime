import React from "react";
import { Select, MenuItem } from "@mui/material";

const DropDown = ({ value, onChange, options, ...props }) => {
  return (
    <Select value={value} onChange={onChange} fullWidth {...props}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DropDown;
