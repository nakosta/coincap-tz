import { JSX } from "react";
import { Typography } from "antd";
import { Coin } from "../../api";
import styles from "./index.module.css";

const { Text } = Typography;

type Props = {
  coin: Coin;
};

const TitleCoin = ({ coin }: Props): JSX.Element => {
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
