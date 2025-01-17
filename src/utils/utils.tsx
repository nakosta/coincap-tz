import { JSX } from "react";
import { Typography } from "antd";
import type { PortfolioItem } from "../redux/slices/portfolioSlice";

const { Text } = Typography;

export const calculateCurrentQuantity = (item: PortfolioItem): number =>
  item.operations.reduce((acc, op) => acc + op.quantity, 0);

export const calculateTotalValue = (portfolio: PortfolioItem[]): number =>
  portfolio.reduce(
    (acc, item) =>
      acc + (item.currentPrice ?? 0) * calculateCurrentQuantity(item),
    0
  );

export const calculateInitialTotalValue = (
  portfolio: PortfolioItem[]
): number =>
  portfolio.reduce(
    (acc, item) =>
      acc +
      item.operations.reduce(
        (subAcc, op) => subAcc + op.quantity * op.priceAtAddition,
        0
      ),
    0
  );

export const calculateTotalDifference = (
  totalValue: number,
  initialTotalValue: number
): number => totalValue - initialTotalValue;

export const calculatePercentageDifference = (
  totalDifference: number,
  initialTotalValue: number
): number =>
  initialTotalValue !== 0 ? (totalDifference / initialTotalValue) * 100 : 0;

export const errors = {
  getCoins: "Ошибка при получении криптомонет",
  getCoin: "Ошибка при получении криптомонеты",
  getHistory: "Ошибка при получении истории криптомонеты",
  selectedCoin: "Выбранная криптовалюта не найдена",
  loadLocalStorage: "Не удалось загрузить portfolio из localStorage:",
  saveLocalStorage: "Не удалось сохранить portfolio в localStorage:",
};

export const toFixed2 = (value: number): string => value.toFixed(2);

export const priceUsdStr = (value: string | null): string =>
  value ? `$${toFixed2(parseFloat(value))}` : "N/A";

export const billionStr = (value: string | null): string =>
  value ? `$${(parseFloat(value) / 1e9).toFixed(1)} млрд` : "N/A";

export const millionStr = (value: string | null): string =>
  value ? `${(parseFloat(value) / 1e6).toFixed(1)} млн` : "N/A";

export const changePercentStr = (value: string | null): JSX.Element => (
  <Text
    style={{
      color: parseFloat(value || "0") >= 0 ? "green" : "red",
    }}
  >
    {toFixed2(parseFloat(value || "0"))}%
  </Text>
);
