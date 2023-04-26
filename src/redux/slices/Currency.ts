import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Currency {
  value: number;
}

const initialState: Currency = {
  value: 0,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  currencySlice.actions;
export default currencySlice.reducer;
