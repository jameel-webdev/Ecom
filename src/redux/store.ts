import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (mid) => [...mid(), userApi.middleware, productApi.middleware],
});
