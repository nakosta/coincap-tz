import { JSX } from "react";
import { Typography } from "antd";

const { Text } = Typography;

export const errors = {
  getCoins: "Ошибка при получении криптомонет",
  getCoin: "Ошибка при получении криптомонеты",
  getHistory: "Ошибка при получении истории криптомонеты",
};

const toFixed2 = (value: number): string => value.toFixed(2);

const formatNumber = (value: number): string => {
  if (value >= 1e12) {
    return `$${toFixed2(value / 1e12)} трлн`;
  } else if (value >= 1e9) {
    return `$${toFixed2(value / 1e9)} млрд`;
  } else if (value >= 1e6) {
    return `$${toFixed2(value / 1e6)} млн`;
  }
  return `$${toFixed2(value)}`;
};

export const formatStr = (value: string | null): string => {
  if (!value) return "N/A";
  const numValue = parseFloat(value);
  return formatNumber(numValue);
};

export const changePercentStr = (value: string | null): JSX.Element => (
  <Text
    style={{
      color: parseFloat(value || "0") >= 0 ? "green" : "red",
    }}
  >
    {toFixed2(parseFloat(value || "0"))}%
  </Text>
);
