import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../hooks/hooks";
import { coinsApi } from "../../api";
import type { History } from "../../api";
import { errors } from "../../utils/utils";

export const axiosHistory = createAppAsyncThunk<
  History[],
  string,
  { rejectValue: string }
>("history/axiosHistory", async (id, thunkAPI) => {
  try {
    const history = await coinsApi.getHistory(id);
    return history;
  } catch (e) {
    const error = e as { message: string };
    return thunkAPI.rejectWithValue(error.message || errors.getHistory);
  }
});

type HistoryState = {
  history: History[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: HistoryState = {
  history: [],
  status: "idle",
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(axiosHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.history = action.payload;
      })
      .addCase(axiosHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || errors.getHistory;
      });
  },
});

export default historySlice.reducer;
