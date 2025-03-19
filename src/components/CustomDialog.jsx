import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "./ui/Button";

const CustomDialog = ({
  open,
  onClose,
  title,
  children,
  onSave,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelButtonText}</Button>
        <Button onClick={onSave}>{saveButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
