import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Currency from "../../models/currency";

const initialState: Currency = {
  loading: false,
  symbols: {},
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencySymbols(state, action: PayloadAction<Currency>) {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversion1.pending, (state, action) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchConversion1.fulfilled, (state, action) => {
      state.loading = false;
      let rate = action.payload.rate;
      let result = rate * action.payload.amount;
      // limit float to 2 decimal places
      result = Math.round(result * 100) / 100;
      state.conversionResult = {
        from: action.payload.from,
        to: action.payload.to,
        amount: action.payload.amount,
        result,
      };
    });
    builder.addCase(fetchConversion1.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(fetchMostCommonRates.pending, (state, action) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchMostCommonRates.fulfilled, (state, action) => {
      state.loading = false;
      state.conversionResults = action.payload.map((res) => {
        let rate = res.rate;
        let result = rate * res.amount;
        // limit float to 2 decimal places
        result = Math.round(result * 100) / 100;
        return {
          from: res.from,
          to: res.to,
          amount: res.amount,
          result,
        };
      });
    });
    builder.addCase(fetchMostCommonRates.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const fetchConversion1 = createAsyncThunk(
  "rate/fetch",
  async (params: { from: string; to: string; amount: number }) => {
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=OI4BVh2gSNvOYdVSGHDqDqjB6p37LN4OkZB6y1kr&currencies=${params.to}&base_currency=${params.from}`
    );
    return {
      from: params.from,
      to: params.to,
      amount: params.amount,
      rate: response.data.data[params.to],
    };
  }
);

export const fetchMostCommonRates = createAsyncThunk(
  "rate/fetchMostCommonRates",
  async (params: { from: string; to: string; amount: number }) => {
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=OI4BVh2gSNvOYdVSGHDqDqjB6p37LN4OkZB6y1kr&currencies=EUR%2CUSD%2CCAD%2CBGN%2CBRL%2CCHF%2CCNY%2CCZK%2CGBP`
    );
    return Object.keys(response.data.data).map((key) => {
      return {
        from: params.from,
        to: key,
        amount: params.amount,
        rate: response.data.data[key],
      };
    });
  }
);

// export const {} = currencySlice.actions;
export default currencySlice.reducer;
