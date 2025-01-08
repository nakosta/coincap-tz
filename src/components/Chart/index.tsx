import { JSX } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useAppSelector } from "../../hooks/hooks";
import { selectHistory } from "../../redux/selectors/selectors";

import styles from "./index.module.css";

const Chart = (): JSX.Element => {
  const history = useAppSelector(selectHistory);

  const chartData = history.slice(-30).map((item) => ({
    data: new Date(item.time).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
    }),
    price: Math.round(parseFloat(item.priceUsd)),
  }));

  return (
    <div className={styles.chart}>
      <LineChart width={1400} height={300} data={chartData}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="data" />
        <YAxis
          domain={[
            Math.min(...chartData.map((item) => item.price)),
            Math.max(...chartData.map((item) => item.price)),
          ]}
        />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Chart;
