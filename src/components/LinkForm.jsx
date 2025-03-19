import React from "react";
import { Select, MenuItem, TextField, FormLabel, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextInput from "./ui/TextInput";
import DropDown from "./ui/DropDown";

const LinkForm = ({ nodes, newLink, setNewLink }) => {
  const { t } = useTranslation(); // Hook for internationalization

  // Add this function to generate random IDs


  // Then in the form submission handler, use the generated ID
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a random ID for the link
    const linkId = generateRandomId();
    
    dispatch(addLink({
      id: linkId,
      source: formData.source,
      target: formData.target,
      value: formData.value,
      // ...other properties
    }));
    
    // Reset form
    setFormData({ source: '', target: '', value: '' });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <FormLabel>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("source")}
          </Typography>
        </FormLabel>
        <DropDown
          value={newLink.source}
          onChange={(e) => setNewLink({ ...newLink, source: e.target.value })}
          options={nodes.map((node) => ({ value: node.id, label: node.name }))}
        />
      </Box>

      <Box>
        <FormLabel>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("target")}
          </Typography>
        </FormLabel>
        <DropDown
          value={newLink.target}
          onChange={(e) => setNewLink({ ...newLink, target: e.target.value })}
          options={nodes.map((node) => ({ value: node.id, label: node.name }))}
        />
      </Box>

      <Box>
        <FormLabel>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("value")}
          </Typography>
        </FormLabel>
        <TextInput
          type="number"
          value={newLink.value}
          onChange={(e) => setNewLink({ ...newLink, value: e.target.value })}
        />
      </Box>
    </Box>
  );
};

export default LinkForm;