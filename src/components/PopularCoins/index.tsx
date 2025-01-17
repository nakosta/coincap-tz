import { JSX } from "react";
import { Space, Typography, Spin, Divider } from "antd";
import {
  selectCoins,
  selectCoinsStatus,
} from "../../redux/selectors/selectors";
import { useAppSelector } from "../../hooks/hooks";
import { getPopularCoins } from "../../helpers/otherHelpers";
import styles from "./index.module.css";

const { Text } = Typography;

const PopularCoins = (): JSX.Element => {
  const coins = useAppSelector(selectCoins);
  const status = useAppSelector(selectCoinsStatus);
  const popularCoins = getPopularCoins(coins);

  if (status === "loading") {
    return <Spin />;
  }

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
