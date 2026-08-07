import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCoin:
    localStorage.getItem("selectedCoin") || "bitcoin",

  selectedCurrency:
    localStorage.getItem("selectedCurrency") || "usd",

  selectedDays:
    Number(localStorage.getItem("selectedDays")) || 1,

  chartType:
    localStorage.getItem("chartType") || "prices",

  // NEW
  selectedChart:
    localStorage.getItem("selectedChart") || "line",

  portfolio:
    JSON.parse(localStorage.getItem("portfolio")) || [],

  searchTerm: "",
};

const cryptoSlice = createSlice({
  name: "crypto",

  initialState,

  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;

      localStorage.setItem(
        "selectedCoin",
        action.payload
      );
    },

    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;

      localStorage.setItem(
        "selectedCurrency",
        action.payload
      );
    },

    setSelectedDays: (state, action) => {
      state.selectedDays = action.payload;

      localStorage.setItem(
        "selectedDays",
        action.payload
      );
    },

    setChartType: (state, action) => {
      state.chartType = action.payload;

      localStorage.setItem(
        "chartType",
        action.payload
      );
    },

    // NEW
    setSelectedChart: (state, action) => {
      state.selectedChart = action.payload;

      localStorage.setItem(
        "selectedChart",
        action.payload
      );
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    addPortfolioCoin: (state, action) => {
      const existing = state.portfolio.find(
        (coin) => coin.id === action.payload.id
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.portfolio.push(action.payload);
      }

      localStorage.setItem(
        "portfolio",
        JSON.stringify(state.portfolio)
      );
    },

    removePortfolioCoin: (state, action) => {
      state.portfolio = state.portfolio.filter(
        (coin) => coin.id !== action.payload
      );

      localStorage.setItem(
        "portfolio",
        JSON.stringify(state.portfolio)
      );
    },
  },
});

export const {
  setSelectedCoin,
  setSelectedCurrency,
  setSelectedDays,
  setChartType,
  setSelectedChart,
  setSearchTerm,
  addPortfolioCoin,
  removePortfolioCoin,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;