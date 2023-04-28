import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Currency from "../../models/currency";

const initialState: Currency = {
  loading: false,
  symbols: {
    AUD: "Australian Dollar",
    BGN: "Bulgarian Lev",
    BRL: "Brazilian Real",
    CAD: "Canadian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan Renminbi",
    CZK: "Czech Koruna",
    DKK: "Danish Krone",
    EUR: "Euro",
    GBP: "British Pound Sterling",
    HKD: "Hong Kong Dollar",
    HRK: "Croatian Kuna",
    HUF: "Hungarian Forint",
    ILS: "Israeli New Shekel",
    INR: "Indian Rupee",
    ISK: "Icelandic Krona",
    JPY: "Japanese Yen",
    KRW: "South Korean Won",
    MXN: "Mexican Peso",
    MYR: "Malaysian Ringgit",
    NOK: "Norwegian Krone",
    NZD: "New Zealand Dollar",
    PHP: "Philippine Peso",
    PLN: "Polish Zloty",
    RON: "Romanian Leu",
    RUB: "Russian Ruble",
    SEK: "Swedish Krona",
    SGD: "Singapore Dollar",
    THB: "Thai Baht",
    TRY: "Turkish Lira",
    USD: "US Dollar",
    ZAR: "South African Rand",
  },
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
