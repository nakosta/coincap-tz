import { JSX } from "react";
import { Typography } from "antd";
import ErrorText from "../ErrorText";
import { useAppSelector } from "../../hooks/hooks";
import { selectCoin, selectCoinStatus, selectCoinError } from "../../redux/selectors/selectors";
import styles from "./index.module.css";

const { Text } = Typography;

const TitleCoin = (): JSX.Element => {
  const coin = useAppSelector(selectCoin);
  const status = useAppSelector(selectCoinStatus);
  const error = useAppSelector(selectCoinError);

  if (status === "failed" || !coin) {
    return <ErrorText error={error} />;
  }

  return (
    <div className={styles.title}>
      <Text type="danger" className={styles.symbol}>
        {coin.symbol}
      </Text>
      <Text type="danger" className={styles.name}>
        {coin.name}
      </Text>
    </div>
  );
};

export default TitleCoin;
