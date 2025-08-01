import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./reducers/appSlice";

export const store = configureStore({
  reducer: { app: appSlice },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
