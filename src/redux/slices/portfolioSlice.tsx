import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../helpers/localStorageHelper";

export type PortfolioOperation = {
  quantity: number;
  priceAtAddition: number;
};

export type PortfolioItem = {
  id: string;
  name: string;
  currentPrice?: number;
  operations: PortfolioOperation[];
};

export interface PortfolioState {
  items: PortfolioItem[];
}

const initialState: PortfolioState = loadFromLocalStorage();

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        operation: PortfolioOperation;
      }>
    ) {
      const { id, name, operation } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.operations.push(operation);
      } else {
        state.items.push({
          id,
          name,
          currentPrice: undefined,
          operations: [operation],
        });
      }
      saveToLocalStorage(state);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state);
    },
    updateCurrentPrices(
      state,
      action: PayloadAction<{ id: string; price: number }[]>
    ) {
      action.payload.forEach((update) => {
        const item = state.items.find((item) => item.id === update.id);
        if (item) item.currentPrice = update.price;
      });
      saveToLocalStorage(state);
    },
  },
});

export const { addItem, removeItem, updateCurrentPrices } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
