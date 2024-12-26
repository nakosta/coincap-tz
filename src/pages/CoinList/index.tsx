import { JSX, useEffect } from "react";
import { Table, Button, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { axiosCoins } from "../../redux/slices/coinsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./index.module.css";

const { Text } = Typography;

// Интерфейс для данных монет
export type Coin = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  vwap24Hr: string | null;
  changePercent24Hr: string | null;
  marketCapUsd: string | null;
  priceUsd: string | null;
};

const CoinList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { coins, status, error } = useAppSelector((state) => state.coins);

  useEffect(() => {
    dispatch(axiosCoins());
  }, [dispatch]);

  const columns: ColumnsType<Coin> = [
    {
      title: "№",
      dataIndex: "rank",
      key: "rank",
      width: "5%",
      align: "center",
    },
    {
      title: "Ticker",
      dataIndex: "symbol",
      key: "symbol",
      width: "10%",
      align: "center",
      render: (value: string) => (
        <Text strong className={styles.symbol}>
          {value}
        </Text>
      ),
    },
    {
      title: <div className={styles.title}>Name</div>,
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (value: string) => <Text strong>{value}</Text>,
    },
    {
      title: "VWAP (24Hr)",
      dataIndex: "vwap24Hr",
      key: "vwap24Hr",
      width: "15%",
      align: "center",
      render: (value: string | null) =>
        value ? `$${parseFloat(value).toFixed(2)}` : "N/A",
    },
    {
      title: "Change (24Hr)",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
      width: "15%",
      align: "center",
      render: (value: string | null) => (
        <span
          style={{ color: parseFloat(value || "0") >= 0 ? "green" : "red" }}
        >
          {parseFloat(value || "0").toFixed(2)}%
        </span>
      ),
    },
    {
      title: "Market Cap",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
      width: "15%",
      align: "center",
      render: (value: string | null) =>
        value ? `$${(parseFloat(value) / 1e9).toFixed(1)} млрд` : "N/A",
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      key: "priceUsd",
      width: "10%",
      align: "center",
      render: (value: string | null) => (
        <Text strong>{value ? `$${parseFloat(value).toFixed(2)}` : "N/A"}</Text>
      ),
    },
    {
      title: "Add",
      key: "add",
      width: "10%",
      align: "center",
      render: (_: any, record: Coin) => (
        <Button type="primary" onClick={() => console.log(`Add: ${record.id}`)}>
          +
        </Button>
      ),
    },
  ];

  return (
    <Table<Coin>
      dataSource={coins}
      columns={columns}
      rowKey={(record) => record.id}
      pagination={{
        pageSize: 10,
        position: ["bottomCenter"],
        showSizeChanger: false,
      }}
      loading={status === "loading"}
    />
  );
};

export default CoinList;
