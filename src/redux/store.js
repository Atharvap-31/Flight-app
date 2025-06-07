// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import  flightReducer from "../redux/createSlice"; 

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, flightReducer);

const store = configureStore({
  reducer: {
    flights: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
