import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Typography } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useCoins } from "../../hooks/queries/useCoins";
import { useSearchCoins } from "../../hooks/queries/useSearchCoins";
import ErrorText from "../ErrorText";
import { formatStr, changePercentStr } from "../../utils/utils";
import { getSortedCoins } from "../../helpers/helpers";
import type { SortOrder, SortKey } from "../../helpers/helpers";
import type { Coin } from "../../api";
import styles from "./index.module.css";

const { Text } = Typography;

type Props = {
  searchQuery: string;
};

const TableCoins = ({ searchQuery }: Props) => {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const navigate = useNavigate();

  const {
    data: coins,
    isLoading,
    isError,
    error,
  } = searchQuery ? useSearchCoins(searchQuery) : useCoins();

  const sortedCoins = useMemo(() => {
    if (!coins) return [];
    return getSortedCoins(coins, sortKey, sortOrder);
  }, [coins, sortKey, sortOrder]);

  const handleTableChange: TableProps<Coin>["onChange"] = (_, __, sorter) => {
    if (!Array.isArray(sorter)) {
      setSortKey(sorter.field as SortKey);
      setSortOrder(sorter.order as SortOrder);
    }
  };

  const columns: ColumnsType<Coin> = [
    {
      title: "№",
      dataIndex: "rank",
      key: "rank",
      width: "5%",
      align: "center",
      sorter: true,
      sortOrder: sortKey === "rank" ? sortOrder : null,
    },
    {
      title: "Ticker",
      dataIndex: "symbol",
      key: "symbol",
      width: "5%",
      align: "center",
      sorter: true,
      sortOrder: sortKey === "symbol" ? sortOrder : null,
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
      sorter: true,
      sortOrder: sortKey === "name" ? sortOrder : null,
      render: (value: string) => <Text strong>{value}</Text>,
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      key: "priceUsd",
      align: "center",
      sorter: true,
      sortOrder: sortKey === "priceUsd" ? sortOrder : null,
      render: (value: string | null) => <Text strong>{formatStr(value)}</Text>,
    },
    {
      title: "Market Cap",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
      align: "center",
      sorter: true,
      sortOrder: sortKey === "marketCapUsd" ? sortOrder : null,
      render: (value: string | null) => formatStr(value),
    },
    {
      title: "VWAP (24Hr)",
      dataIndex: "vwap24Hr",
      key: "vwap24Hr",
      align: "center",
      sorter: true,
      sortOrder: sortKey === "vwap24Hr" ? sortOrder : null,
      render: (value: string | null) => formatStr(value),
    },
    {
      title: "Supply",
      dataIndex: "supply",
      key: "supply",
      align: "center",
      sorter: true,
      sortOrder: sortKey === "supply" ? sortOrder : null,
      render: (value: string | null) => formatStr(value),
    },
    {
      title: "Volume (24Hr)",
      dataIndex: "volumeUsd24Hr",
      key: "volumeUsd24Hr",
      align: "center",
      sorter: true,
      sortOrder: sortKey === "volumeUsd24Hr" ? sortOrder : null,
      render: (value: string | null) => formatStr(value),
    },
    {
      title: "Change (24Hr)",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
      align: "center",
      sorter: true,
      sortOrder: sortKey === "changePercent24Hr" ? sortOrder : null,
      render: (value: string | null) => changePercentStr(value),
    },
  ];

  if (isError) return <ErrorText error={(error as Error).message} />;

  return (
    <Table<Coin>
      dataSource={sortedCoins}
      columns={columns}
      rowKey={(record) => record.id}
      onChange={handleTableChange}
      onRow={(record) => ({
        onClick: () => navigate(`/${record.id}`),
      })}
      pagination={{
        pageSize: 10,
        position: ["bottomCenter"],
        showSizeChanger: false,
      }}
      loading={isLoading}
    />
  );
};

export default TableCoins;
