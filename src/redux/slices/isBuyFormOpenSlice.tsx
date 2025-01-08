import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Coin } from "../../api";

type isBuyFormOpenState = {
  isBuyFormOpen: boolean;
  selectedCoin: Coin | null;
};

const initialState: isBuyFormOpenState = {
  isBuyFormOpen: false,
  selectedCoin: null,
};

const isBuyFormOpenSlice = createSlice({
  name: "isBuyFormOpen",
  initialState,
  reducers: {
    setIsBuyFormOpen: (state, action: PayloadAction<boolean>) => {
      state.isBuyFormOpen = action.payload;
    },
    setSelectedCoin(state, action: PayloadAction<Coin | null>) {
      state.selectedCoin = action.payload;
    },
  },
});

export const { setIsBuyFormOpen, setSelectedCoin } = isBuyFormOpenSlice.actions;
export default isBuyFormOpenSlice.reducer;
