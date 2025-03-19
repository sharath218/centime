import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock API data
const mockData = {
  nodes: [
    { id: "income", name: "Income" },
    { id: "salary", name: "Salary" },
    { id: "bills", name: "Bills" },
    { id: "electricBill", name: "Electric Bill" },
    { id: "mobileBill", name: "Mobile Bill" },
  ],
  links: [
    { source: "income", target: "salary", value: 5000 },
    { source: "salary", target: "bills", value: 3000 },
    { source: "bills", target: "electricBill", value: 1000 },
    { source: "bills", target: "mobileBill", value: 2000 },
  ],
};

export const fetchFlowData = createAsyncThunk("flow/fetchData", async () => {
  // Simulate API call with 2-second delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return mockData;
});

const flowSlice = createSlice({
  name: "flow",
  initialState: {
    nodes: [],
    links: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    addLink: (state, action) => {
      state.links.push(action.payload);
    },
    updateLink: (state, action) => {
      const { source, target, value } = action.payload;
      const linkIndex = state.links.findIndex(
        (link) => link.source === source && link.target === target
      );
      if (linkIndex !== -1) {
        state.links[linkIndex].value = value;
      }
    },
    deleteLink: (state, action) => {
      const { source, target } = action.payload;
      state.links = state.links.filter(
        (link) => !(link.source === source && link.target === target)
      );
    },
    updateLinkSourceTarget: (state, action) => {
      const { index, source, target, value } = action.payload;
      state.links[index] = { source, target, value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlowData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlowData.fulfilled, (state, action) => {
        state.loading = false;
        state.nodes = action.payload.nodes;
        state.links = action.payload.links;
      })
      .addCase(fetchFlowData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addNode,
  addLink,
  updateLink,
  deleteLink,
  updateLinkSourceTarget,
} = flowSlice.actions;
export default flowSlice.reducer;
