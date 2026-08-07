import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./cryptoApi";
import cryptoReducer from "./cryptoSlice.js";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,

    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

// Debug
console.log("✅ STORE CREATED");
console.log("Redux State:", store.getState());