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
import { getChartData, getDomain } from "../../helpers/otherHelpers";

import styles from "./index.module.css";

const Chart = (): JSX.Element => {
  const history = useAppSelector(selectHistory);
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
