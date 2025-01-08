import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../hooks/hooks";
import { coinsApi } from "../../api";
import type { Coin } from "../../api";
import { errors } from "../../utils/utils";

export const axiosCoin = createAppAsyncThunk<
  Coin,
  string,
  { rejectValue: string }
>("coin/axiosCoin", async (id, thunkAPI) => {
  try {
    const coin = await coinsApi.getCoin(id);
    return coin;
  } catch (e) {
    const error = e as { message: string };
    return thunkAPI.rejectWithValue(error.message || errors.getCoin);
  }
});

interface CoinState {
  coin: Coin | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CoinState = {
  coin: null,
  status: "idle",
  error: null,
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosCoin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(axiosCoin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coin = action.payload;
      })
      .addCase(axiosCoin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || errors.getCoin;
      });
  },
});

export default coinSlice.reducer;
