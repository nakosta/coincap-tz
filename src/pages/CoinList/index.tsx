import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import BuyFormModal from "../../components/BuyFormModal";
import ErrorText from "../../components/ErrorText";
import {
  setIsBuyFormOpen,
  setSelectedCoin,
} from "../../redux/slices/isBuyFormOpenSlice";
import {
  selectCoins,
  selectCoinsStatus,
  selectCoinsError,
} from "../../redux/selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { priceUsdStr, billionStr, changePercentStr } from "../../utils/utils";
import type { Coin } from "../../api";
import styles from "./index.module.css";

const { Text } = Typography;

const CoinList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectCoins);
  const status = useAppSelector(selectCoinsStatus);
  const error = useAppSelector(selectCoinsError);

  const navigate = useNavigate();

  if (error) {
    return <ErrorText error={error} />;
  }

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
      render: (value: string | null) => priceUsdStr(value),
    },
    {
      title: "Change (24Hr)",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
      width: "15%",
      align: "center",
      render: (value: string | null) => changePercentStr(value),
    },
    {
      title: "Market Cap",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
      width: "15%",
      align: "center",
      render: (value: string | null) => billionStr(value),
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      key: "priceUsd",
      width: "10%",
      align: "center",
      render: (value: string | null) => (
        <Text strong>{priceUsdStr(value)}</Text>
      ),
    },
    {
      title: "Add",
      key: "add",
      width: "10%",
      align: "center",
      render: (_: any, record) => (
        <Button
          type="primary"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(setSelectedCoin(record));
            dispatch(setIsBuyFormOpen(true));
          }}
        >
          +
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table<Coin>
        dataSource={coins}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => navigate(`/${record.id}`),
        })}
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
          showSizeChanger: false,
        }}
        loading={status === "loading"}
      />
      <BuyFormModal />
    </>
  );
};

export default CoinList;
