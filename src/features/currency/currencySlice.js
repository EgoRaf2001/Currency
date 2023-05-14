import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCurrencies, fetchSelectedExchangeRate } from "./currencyAPI";

const toArray = (array) =>
  Object.entries(array).map(([key, value]) => {
    return { key, value };
  });

const initialState = {
  status: "idle",
  currencyArray: [],
  currencyFrom: null,
  currencyTo: null,
  fromAmount: 1,
  toAmount: "",
  selectedExchangeRate:""
};
export const getCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async () => {
    const response = await fetchCurrencies();
    return response.data;
  }
);

export const getExchangeRate = createAsyncThunk(
  "currency/getExchangeRate",
  async ({ selectedCurrencyFrom, selectedCurrencyTo }) => {
    const response = await fetchSelectedExchangeRate(
      selectedCurrencyFrom,
      selectedCurrencyTo,
    );
    return response.data.data;
  }
);
export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencyArray = toArray(action.payload.data);
    },
    setCurrencyFrom: (state, action) => {
      state.currencyFrom = action.payload;
    },
    setCurrencyTo: (state, action) => {
      state.currencyTo = action.payload;
    },
    setFromAmount: (state, action) => {
      state.fromAmount = +action.payload;
      state.toAmount = state.fromAmount *  state.selectedExchangeRate;
    },
    setToAmount: (state, action) => {
      state.toAmount = +action.payload;
      state.fromAmount=state.toAmount/state.selectedExchangeRate
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCurrencies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.status = "idle";
        state.currencyArray = toArray(action.payload.data);
      })

      .addCase(getExchangeRate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getExchangeRate.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedExchangeRate=Object.values(action.payload)[0];
        state.toAmount = state.fromAmount *  state.selectedExchangeRate;
      });
  },
});

export const {
  setToAmount,
  setFromAmount,
  setCurrencyTo,
  setCurrencies,
  setCurrencyFrom,
} = currencySlice.actions;

export const currencyFrom = (state) => state.currency.currencyFrom;
export const currencyTo = (state) => state.currency.currencyTo;
export const selectCurrencies = (state) => state.currency.currencyArray;
export const fromAmount = (state) => state.currency.fromAmount;
export const toAmount = (state) => state.currency.toAmount;
export default currencySlice.reducer;
