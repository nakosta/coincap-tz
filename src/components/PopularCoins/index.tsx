import { JSX } from "react";
import { Space, Typography, Spin, Divider } from "antd";
import {
  selectCoins,
  selectCoinsStatus,
} from "../../redux/selectors/selectors";
import { useAppSelector } from "../../hooks/hooks";
import { priceUsdStr } from "../../utils/utils";
import styles from "./index.module.css";

const { Text } = Typography;

const PopularCoins = (): JSX.Element => {
  const coins = useAppSelector(selectCoins);
  const status = useAppSelector(selectCoinsStatus);
  if (status === "loading") {
    return <Spin />;
  }

  const popularCoins = coins.slice(0, 3).map((coin) => ({
    name: coin.name,
    price: priceUsdStr(coin.priceUsd),
  }));

  return (
    <div className={styles.container}>
      <Text>Популярные криптовалюты:</Text>
      <Divider className={styles.divider} />
      <Space className={styles.space}>
        {popularCoins.map((popularCoin) => (
          <div key={popularCoin.name} className={styles.textContainer}>
            <Text strong className={styles.text}>
              {popularCoin.name}
            </Text>
            <Text>{popularCoin.price}</Text>
          </div>
        ))}
      </Space>
    </div>
  );
};

export default PopularCoins;
