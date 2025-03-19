import React from "react";
import { FormLabel, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next"; // Hook for internationalization
import TextInput from "./ui/TextInput";

// Add this function to generate random IDs
const generateRandomId = () => {
  return 'node_' + Math.random().toString(36).substr(2, 9);
};

const NodeForm = ({ newNode, setNewNode }) => {
  const { t } = useTranslation(); // Fetch translated strings

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a random ID instead of using user input
    const nodeId = generateRandomId();
    
    // Use the generated ID instead of formData.id
    setNewNode({
      ...newNode,
      id: nodeId,
    });
    
    // Reset form
    setNewNode({ name: '', /* other fields but no id */ });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <FormLabel>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("name")}
          </Typography>
        </FormLabel>
        <TextInput
          value={newNode.name}
          onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
          label={t("name")}
        />
      </Box>
    </Box>
  );
};

export default NodeForm;
