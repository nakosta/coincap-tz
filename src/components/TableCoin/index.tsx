import { JSX } from "react";
import { Typography, Table } from "antd";
import ErrorText from "../ErrorText";
import { useAppSelector } from "../../hooks/hooks";
import { selectCoin, selectCoinStatus, selectCoinError } from "../../redux/selectors/selectors";
import {
  priceUsdStr,
  billionStr,
  millionStr,
  changePercentStr,
} from "../../utils/utils";

import styles from "./index.module.css";

const { Link } = Typography;

const TableCoin = (): JSX.Element => {
  const coin = useAppSelector(selectCoin);
  const status = useAppSelector(selectCoinStatus);
  const error = useAppSelector(selectCoinError);

  if (status === "failed" || !coin) {
    return <ErrorText error={error} />;
  }

  const tableData = [
    { key: "Цена", value: priceUsdStr(coin.priceUsd) },
    {
      key: "Доступное предложение для торговли",
      value: millionStr(coin.supply),
    },
    {
      key: "Общее кол-во выпущенных активов",
      value: millionStr(coin.maxSupply),
    },
    {
      key: "Объем торгов за последние 24 часа",
      value: billionStr(coin.volumeUsd24Hr),
    },
    {
      key: "Средняя цена по объёму за последние 24 часа",
      value: priceUsdStr(coin.vwap24Hr),
    },
    {
      key: "Процентное изменение цены за последние 24 часа",
      value: changePercentStr(coin.changePercent24Hr),
    },
    {
      key: "Сайт",
      value: coin.explorer ? (
        <Link href={coin.explorer} target="_blank" rel="noopener noreferrer">
          {coin.explorer}
        </Link>
      ) : (
        "N/A"
      ),
    },
  ];

  return (
    <Table
      className={styles.table}
      dataSource={tableData}
      columns={[
        {
          title: <div className={styles.tableTitle}>Информация</div>,
          dataIndex: "key",
          width: "60%",
        },
        {
          title: <div className={styles.tableTitle}>Данные</div>,
          dataIndex: "value",
          width: "40%",
        },
      ]}
      pagination={false}
      rowKey="key"
    />
  );
};

export default TableCoin;
