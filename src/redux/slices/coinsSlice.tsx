import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../hooks/hooks";
import { coinsApi } from "../../api";
import type { Coin } from "../../pages/CoinList";
import { errors } from "../../utils/utils";

export const axiosCoins = createAppAsyncThunk<
  Coin[],
  void,
  { rejectValue: string }
>("coins/axiosCoins", async (_, thunkAPI) => {
  try {
    const coins = await coinsApi.getCoins();
    return coins;
  } catch (e) {
    const error = e as { message: string };
    return thunkAPI.rejectWithValue(error.message || errors.getCoins);
  }
});

interface CoinsState {
  coins: Coin[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CoinsState = {
  coins: [],
  status: "idle",
  error: null,
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosCoins.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(axiosCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(axiosCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || errors.getCoins;
      });
  },
});

export default coinsSlice.reducer;
