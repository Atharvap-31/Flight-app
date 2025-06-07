import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
};

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    clearFlights: (state) => {
      state.flights = [];
    },
  },
});

export const { setFlights, clearFlights } = flightSlice.actions;
export default flightSlice.reducer;
