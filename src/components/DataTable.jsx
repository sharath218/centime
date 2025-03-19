import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addNode,
  addLink,
  deleteLink,
  updateLinkSourceTarget,
} from "../store/flowSlice";
import { useTranslation } from "react-i18next";
import CustomDialog from "./CustomDialog";
import NodeForm from "./NodeForm";
import LinkForm from "./LinkForm";
import { Alert } from "@mui/material";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";
import DropDown from "./ui/DropDown";

const DataTable = () => {
  const dispatch = useDispatch();
  const { nodes, links } = useSelector((state) => state.flow);
  const { t } = useTranslation();
  const [openNodeDialog, setOpenNodeDialog] = useState(false);
  const [openLinkDialog, setOpenLinkDialog] = useState(false);
  const [newNode, setNewNode] = useState({ id: "", name: "" });
  const [newLink, setNewLink] = useState({ source: "", target: "", value: 0 });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const generateRandomId = () => {
    return "link_" + Math.random().toString(36).substr(2, 9);
  };

  const handleAddNode = () => {
    
    if (!newNode.name) {
      setSnackbarMessage(" Name is required.");
      setSnackbarOpen(true);
      return;
    }
    dispatch(addNode(newNode));
    setOpenNodeDialog(false);
    setNewNode({ id: "", name: "" });
  };

  const hasCycle = (source, target, links) => {
    const graph = {};
    links.forEach((link) => {
      if (!graph[link.source]) graph[link.source] = [];
      graph[link.source].push(link.target);
    });

    const visited = new Set();
    const stack = new Set();

    const dfs = (node) => {
      if (stack.has(node)) return true; // Cycle detected
      if (visited.has(node)) return false;

      visited.add(node);
      stack.add(node);

      if (graph[node]) {
        for (const neighbor of graph[node]) {
          if (dfs(neighbor)) return true;
        }
      }

      stack.delete(node);
      return false;
    };

    // Add the new link temporarily to check for cycles
    if (!graph[source]) graph[source] = [];
    graph[source].push(target);

    return dfs(target);
  };

  const handleAddLink = () => {
    if (!newLink.source || !newLink.target) {
      setSnackbarMessage("Source and target are required.");
      setSnackbarOpen(true);
      return;
    }
    if (newLink.source === newLink.target) {
      setSnackbarMessage("Source and target cannot be the same.");
      setSnackbarOpen(true);
      return;
    }

    if (hasCycle(newLink.source, newLink.target, [...links, newLink])) {
      setSnackbarMessage("Adding this link creates a circular reference.");
      setSnackbarOpen(true);
      return;
    }

    dispatch(addLink({ ...newLink, value: Number(newLink.value) }));
    setOpenLinkDialog(false);
    setNewLink({ source: "", target: "", value: 0 });
  };

  const handleUpdateLink = (index, source, target, newValue) => {
    if (source === target) {
      setSnackbarMessage("Source and target cannot be the same.");
      setSnackbarOpen(true);
      return;
    }

    const updatedLinks = links.map((link, i) =>
      i === index ? { source, target, value: Number(newValue) } : link
    );

    if (hasCycle(source, target, updatedLinks)) {
      setSnackbarMessage("Updating this link creates a circular reference.");
      setSnackbarOpen(true);
      return;
    }

    dispatch(
      updateLinkSourceTarget({ index, source, target, value: Number(newValue) })
    );
  };

  const handleDeleteLink = (source, target) => {
    dispatch(deleteLink({ source, target }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => setOpenNodeDialog(true)}
          style={{ marginRight: "1rem" }}
        >
          {t("addNode")}
        </Button>
        <Button onClick={() => setOpenLinkDialog(true)}>{t("addLink")}</Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("source")}</TableCell>
              <TableCell>{t("target")}</TableCell>
              <TableCell>{t("value")}</TableCell>
              <TableCell>{t("actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((link, index) => (
              <TableRow key={index}>
                <TableCell>
                  <DropDown
                    sx={{ minWidth: "300px" }}
                    value={link.source}
                    onChange={(e) =>
                      handleUpdateLink(
                        index,
                        e.target.value,
                        link.target,
                        link.value
                      )
                    }
                    size="small"
                    options={nodes.map((node) => ({
                      value: node.id,
                      label: node.name,
                    }))}
                  />
                </TableCell>
                <TableCell>
                  <DropDown
                    value={link.target}
                    onChange={(e) =>
                      handleUpdateLink(
                        index,
                        link.source,
                        e.target.value,
                        link.value
                      )
                    }
                    size="small"
                    sx={{ minWidth: "300px" }}
                    options={nodes.map((node) => ({
                      value: node.id,
                      label: node.name,
                    }))}
                  />
                </TableCell>
                <TableCell>
                  <TextInput
                    sx={{ minWidth: "300px" }}
                    type="number"
                    value={link.value}
                    onChange={(e) =>
                      handleUpdateLink(
                        index,
                        link.source,
                        link.target,
                        e.target.value
                      )
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDeleteLink(link.source, link.target)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomDialog
        open={openNodeDialog}
        onClose={() => setOpenNodeDialog(false)}
        title={t("addNode")}
        onSave={handleAddNode}
      >
        <NodeForm newNode={newNode} setNewNode={setNewNode} />
      </CustomDialog>

      <CustomDialog
        open={openLinkDialog}
        onClose={() => setOpenLinkDialog(false)}
        title={t("addLink")}
        onSave={handleAddLink}
      >
        <LinkForm nodes={nodes} newLink={newLink} setNewLink={setNewLink} />
      </CustomDialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DataTable;
