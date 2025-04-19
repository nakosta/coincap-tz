import { JSX } from "react";
import { Typography, Table } from "antd";
import { Coin } from "../../api";
import {
  formatStr,
  changePercentStr,
} from "../../utils/utils";

import styles from "./index.module.css";

const { Link } = Typography;

type Props = {
  coin: Coin;
};

const TableCoin = ({ coin }: Props): JSX.Element => {
  const tableData = [
    { key: "Цена", value: formatStr(coin.priceUsd) },
    {
      key: "Доступное предложение для торговли",
      value: formatStr(coin.supply),
    },
    {
      key: "Общее кол-во выпущенных активов",
      value: formatStr(coin.maxSupply),
    },
    {
      key: "Объем торгов за последние 24 часа",
      value: formatStr(coin.volumeUsd24Hr),
    },
    {
      key: "Средняя цена по объёму за последние 24 часа",
      value: formatStr(coin.vwap24Hr),
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
