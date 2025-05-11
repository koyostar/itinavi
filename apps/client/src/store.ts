import { configureStore } from "@reduxjs/toolkit";
import { accommodationApi } from "./api/accommodation";

export const store = configureStore({
  reducer: {
    [accommodationApi.reducerPath]: accommodationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accommodationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
