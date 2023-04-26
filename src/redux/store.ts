import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import currencyReducer from "./slices/Currency";

const store = configureStore({
  reducer: {
    counter: currencyReducer,
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
