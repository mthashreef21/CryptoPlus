import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",

    prepareHeaders: (headers) => {
      const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;

      if (apiKey) {
        headers.set("x-cg-demo-api-key", apiKey);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (currency) =>
        `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`,
    }),

    getCoinChart: builder.query({
      query: ({ coinId, days, currency }) => {
        const interval = days === 1 ? "&interval=hourly" : "";

        return `coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}${interval}`;
      },
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetCoinChartQuery,
} = cryptoApi;