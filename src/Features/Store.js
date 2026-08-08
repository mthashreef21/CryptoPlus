import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./CryptoApi";
import cryptoReducer from "./CryptoSlice.js";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,

    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

// Debug
// console.log("✅ STORE CREATED");
// console.log("Redux State:", store.getState());