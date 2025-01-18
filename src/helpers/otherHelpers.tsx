import { priceUsdStr } from "../utils/utils";
import type { Coin, History } from "../api";

export const minNumCoins = 0.0001;

export const getPopularCoins = (coins: Coin[]) =>
  coins.slice(0, 3).map((coin) => ({
    name: coin.name,
    price: priceUsdStr(coin.priceUsd),
  }));

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
