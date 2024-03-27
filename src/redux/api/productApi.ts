import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllCategoriesResponse,
  AllProductsResponse,
} from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/product/`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
    }),
    categories: builder.query<AllCategoriesResponse, string>({
      query: () => "categories",
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
} = productApi;
