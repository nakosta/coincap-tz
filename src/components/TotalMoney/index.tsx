import { JSX } from "react";
import { Typography } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { setIsPortfolioOpen } from "../../redux/slices/isPortfolioOpenSlice";
import { selectPortfolio } from "../../redux/selectors/selectors";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  calculateTotalValue,
  calculateInitialTotalValue,
  calculateTotalDifference,
  calculatePercentageDifference,
} from "../../utils/utils";

import styles from "./index.module.css";

const { Text } = Typography;

const TotalMoney = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector(selectPortfolio);

  const totalValue = calculateTotalValue(portfolio);
  const initialTotalValue = calculateInitialTotalValue(portfolio);
  const totalDifference = calculateTotalDifference(
    totalValue,
    initialTotalValue
  );
  const percentageDifference = calculatePercentageDifference(
    totalDifference,
    initialTotalValue
  );
  const differenceClass =
    totalDifference >= 0 ? styles.positive : styles.negative;

  return (
    <div className={styles.container}>
      <WalletOutlined
        className={styles.wallet}
        onClick={() => dispatch(setIsPortfolioOpen(true))}
      />
      <div className={styles.textContainer}>
        <Text>Итого:</Text>
        <Text strong className={styles.textFixed}>
          {totalValue.toFixed(2)} USD{" "}
          <span className={differenceClass}>
            {totalDifference >= 0 ? "+" : ""}
            {totalDifference.toFixed(2)} ({percentageDifference >= 0 ? "+" : ""}
            {percentageDifference.toFixed(2)}%)
          </span>
        </Text>
      </div>
    </div>
  );
};

export default TotalMoney;
