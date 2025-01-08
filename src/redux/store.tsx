import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./slices/coinsSlice";
import coinReducer from "./slices/coinSlice";
import historyReducer from "./slices/historySlice";
import portfolioReducer from "./slices/portfolioSlice";
import isPortfolioOpenReducer from "./slices/isPortfolioOpenSlice";
import isBuyFormOpenReducer from "./slices/isBuyFormOpenSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    coin: coinReducer,
    history: historyReducer,
    portfolio: portfolioReducer,
    isPortfolioOpen: isPortfolioOpenReducer,
    isBuyFormOpen: isBuyFormOpenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
