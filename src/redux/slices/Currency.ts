import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Currency from "../../models/currency";

var myHeaders = new Headers();
myHeaders.append("apikey", "ZgPvo7SnFasv6g50IxL4RQ1YNWfymrG0");

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: Object.fromEntries(myHeaders.entries()),
  "Access-Control-Allow-Origin": "http://localhost:3000",
};

const initialState: Currency = {
  loading: false,
  symbols: {
    AED: "United Arab Emirates Dirham",
    AFN: "Afghan Afghani",
    ALL: "Albanian Lek",
    AMD: "Armenian Dram",
    ANG: "Netherlands Antillean Guilder",
    AOA: "Angolan Kwanza",
    ARS: "Argentine Peso",
  },
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencySymbols(state, action: PayloadAction<Currency>) {},
    // increment(state) {
    //   state.value += 1;
    // },
    // decrement(state) {
    //   state.value -= 1;
    // },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSymbols.pending, (state, action) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchSymbols.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload.symbols);
      state.symbols = action.payload.symbols;
    });
    builder.addCase(fetchSymbols.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(fetchConversion.pending, (state, action) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchConversion.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      // state.conversionResult = action.payload;
    });
    builder.addCase(fetchConversion.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(fetchConversion1.pending, (state, action) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchConversion1.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      let rate = action.payload.result.data[action.payload.to];
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
  },
});
export const fetchSymbols = createAsyncThunk("symbols/fetch", async () => {
  const response = await axios.get(
    "https://api.apilayer.com/fixer/symbols",
    requestOptions
  );
  return response.data;
});

export const fetchConversion = createAsyncThunk(
  "conversion/fetch",
  async (params: { from: string; to: string; amount: number }) => {
    const response = await axios.get(
      `https://api.apilayer.com/fixer/convert?from=${params.from}&to=${params.to}&amount=${params.amount}`,
      requestOptions
    );
    return response.data;
  }
);
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
      result: response.data,
    };
  }
);

// export const {} = currencySlice.actions;
export default currencySlice.reducer;
