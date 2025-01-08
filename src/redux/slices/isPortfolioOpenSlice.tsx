import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type isPortfolioOpen = {
  value: boolean;
};

const initialState: isPortfolioOpen = {
  value: false,
};

const isPortfolioOpenSlice = createSlice({
  name: "isPortfolioOpen",
  initialState,
  reducers: {
    setIsPortfolioOpen: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setIsPortfolioOpen } = isPortfolioOpenSlice.actions;
export default isPortfolioOpenSlice.reducer;
