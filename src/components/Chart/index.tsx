import { JSX } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { History } from "../../api";
import { getChartData, getDomain } from "../../helpers/helpers";
import styles from "./index.module.css";

type Props = {
  history: History[];
};

const Chart = ({ history }: Props): JSX.Element => {
  const chartData = getChartData(history);

  return (
    <div className={styles.chart}>
      <LineChart width={1400} height={300} data={chartData}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="data" />
        <YAxis domain={getDomain(chartData)} />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Chart;
