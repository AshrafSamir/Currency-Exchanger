import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import HistoricalRate from "../../models/historicalRate";

const initialState: HistoricalRate = {
  loading: false,
  error: undefined,
};

const historicalRateSlice = createSlice({
  name: "historicalRate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistoricalRates.pending, (state, action) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchHistoricalRates.fulfilled, (state, action) => {
      state.loading = false;
      state.data = Object.keys(action.payload.data).map((date) => {
        return {
          date,
          [action.payload.to]: action.payload.data[date][action.payload.to],
        };
      });
    });
    builder.addCase(fetchHistoricalRates.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const fetchHistoricalRates = createAsyncThunk(
  "historicalRate/fetch",
  async (params: { from: string; to: string }) => {
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/historical?apikey=OI4BVh2gSNvOYdVSGHDqDqjB6p37LN4OkZB6y1kr&currencies=${params.to}&base_currency=${params.from}&date_from=2023-04-01T07%3A15%3A49.549Z&date_to=2023-04-27T07%3A15%3A49.549Z`
    );
    return {
      data: response.data.data,
      to: params.to,
    };
  }
);

export default historicalRateSlice.reducer;
