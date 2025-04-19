import type { History } from "../api";
import type { Coin } from "../api";

const last30Days = -30;

export const getChartData = (history: History[]) =>
  history.slice(last30Days).map((item) => ({
    data: new Date(item.time).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
    }),
    price: Math.round(parseFloat(item.priceUsd)),
  }));

type ChartData = {
  data: string;
  price: number;
};

export const getDomain = (chartData: ChartData[]) => {
  const chartDataPrices = chartData.map((item) => item.price);
  return [Math.min(...chartDataPrices), Math.max(...chartDataPrices)];
};

export type SortOrder = "ascend" | "descend" | null;
export type SortKey = keyof Coin | null;

export const getSortedCoins = (
  coins: Coin[],
  sortKey: SortKey,
  sortOrder: SortOrder
): Coin[] => {
  if (!sortKey || !sortOrder) return coins;

  return [...coins].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];

    const numA = valA !== null ? Number(valA) : 0;
    const numB = valB !== null ? Number(valB) : 0;

    if (isNaN(numA) || isNaN(numB)) {
      return sortOrder === "ascend"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    }

    return sortOrder === "ascend" ? numA - numB : numB - numA;
  });
};
