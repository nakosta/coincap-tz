import { createSelector } from "reselect";
import type { RootState } from "../store";

const coinSelector = (state: RootState) => state.coin;

export const selectCoin = createSelector(
  [coinSelector],
  (coinState) => coinState.coin
);

export const selectCoinStatus = createSelector(
  [coinSelector],
  (coinState) => coinState.status
);

export const selectCoinError = createSelector(
  [coinSelector],
  (coinState) => coinState.error
);

const coinsSelector = (state: RootState) => state.coins;

export const selectCoins = createSelector(
  [coinsSelector],
  (coinsState) => coinsState.coins
);

export const selectCoinsStatus = createSelector(
  [coinsSelector],
  (coinsState) => coinsState.status
);

export const selectCoinsError = createSelector(
  [coinsSelector],
  (coinsState) => coinsState.error
);

const historySelector = (state: RootState) => state.history;

export const selectHistory = createSelector(
  [historySelector],
  (historyState) => historyState.history
);

export const selectHistoryStatus = createSelector(
  [historySelector],
  (historyState) => historyState.status
);

export const selectHistoryError = createSelector(
  [historySelector],
  (historyState) => historyState.error
);

const isPortfolioOpenSelector = (state: RootState) => state.isPortfolioOpen;

export const selectIsPortfolioOpen = createSelector(
  [isPortfolioOpenSelector],
  (portfolioOpenState) => portfolioOpenState.value
);

const isBuyFormOpenSelector = (state: RootState) => state.isBuyFormOpen;

export const selectIsBuyFormOpen = createSelector(
  [isBuyFormOpenSelector],
  (buyFormOpenState) => buyFormOpenState.isBuyFormOpen
);

export const selectSelectedCoin = createSelector(
  [isBuyFormOpenSelector],
  (buyFormOpenState) => buyFormOpenState.selectedCoin
);

const portfolioSelector = (state: RootState) => state.portfolio;

export const selectPortfolio = createSelector(
  [portfolioSelector],
  (portfolioState) => portfolioState.items
);
