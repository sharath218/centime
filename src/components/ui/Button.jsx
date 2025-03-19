import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ children, onClick, variant = "contained", ...props }) => {
  return (
    <MuiButton variant={variant} onClick={onClick} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
