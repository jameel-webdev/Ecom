import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./api/dashboardApi";
import { orderApi } from "./api/orderApi";
import { productApi } from "./api/productApi";
import { userApi } from "./api/userApi";
import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      dashboardApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
