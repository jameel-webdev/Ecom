import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StatsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/dashboard`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    stats: builder.query<StatsResponse, string>({
      query: (id) => `stats?id=${id}`,
    }),
  }),
});

export const { useStatsQuery } = dashboardApi;
