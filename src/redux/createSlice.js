import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  tripType: "one-way", 
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
    setTripType: (state, action) => {
      state.tripType = action.payload;
    },
  },
});

export const { setFlights, clearFlights,setTripType  } = flightSlice.actions;
export default flightSlice.reducer;
