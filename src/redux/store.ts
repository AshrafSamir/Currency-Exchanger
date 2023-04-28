import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import currencyReducer from "./slices/Currency";
import historicalRatesReducer from "./slices/HistoricalRate";

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    historicalRate: historicalRatesReducer,
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
