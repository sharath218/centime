import React from "react";
import { TextField } from "@mui/material";

const TextInput = ({ value, onChange, label, type = "text", ...props }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      type={type}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};

export default TextInput;
