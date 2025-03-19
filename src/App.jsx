import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Container, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import SankeyChart from "./components/SankeyChart";
import DataTable from "./components/DataTable";
import { fetchFlowData } from "./store/flowSlice";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.flow);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchFlowData());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
      >
        <Header  />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          marginTop="64px" // Adjust this value based on your header height
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <div>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <SankeyChart />
        <DataTable />
      </Container>
    </div>
  );
}

export default App;
