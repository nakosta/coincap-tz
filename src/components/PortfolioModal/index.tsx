import { useEffect, JSX } from "react";
import { Modal, Table, Button, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CloseOutlined } from "@ant-design/icons";
import { pricesApi } from "../../api";
import {
  updateCurrentPrices,
  removeItem,
} from "../../redux/slices/portfolioSlice";
import type { PortfolioItem } from "../../redux/slices/portfolioSlice";
import { setIsPortfolioOpen } from "../../redux/slices/isPortfolioOpenSlice";
import {
  selectPortfolio,
  selectIsPortfolioOpen,
} from "../../redux/selectors/selectors";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  calculateTotalValue,
  calculateCurrentQuantity,
} from "../../utils/utils";
import styles from "./index.module.css";

const { Title, Text } = Typography;

const PortfolioModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector(selectPortfolio);
  const isPortfolioOpen = useAppSelector(selectIsPortfolioOpen);

  useEffect(() => {
    const assetIds = portfolio.map((item) => item.id);
    if (assetIds.length) {
      const ws = pricesApi.subscribeToPrices(assetIds, (data) => {
        const updatedPrices = Object.entries(data).map(([id, price]) => ({
          id,
          price: parseFloat(price),
        }));
        dispatch(updateCurrentPrices(updatedPrices));
      });

      return () => {
        ws.close();
      };
    }
  }, [portfolio, dispatch]);

  const totalValue = calculateTotalValue(portfolio);

  const columns: ColumnsType<PortfolioItem> = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      width: "30%",
      align: "center",
    },
    {
      title: "Цена",
      dataIndex: "currentPrice",
      key: "currentPrice",
      width: "20%",
      align: "center",
      render: (value: number) => `$${(value ?? 0).toFixed(2)}`,
    },
    {
      title: "Количество",
      key: "quantity",
      width: "20%",
      align: "center",
      render: (_, record) => calculateCurrentQuantity(record).toFixed(2),
    },
    {
      title: "Итого",
      key: "total",
      width: "20%",
      align: "center",
      render: (_, record) =>
        `$${(
          (record.currentPrice ?? 0) * calculateCurrentQuantity(record)
        ).toFixed(2)}`,
    },
    {
      key: "actions",
      width: "10%",
      align: "center",
      render: (_, record) => (
        <Button
          danger
          icon={<CloseOutlined />}
          onClick={() => dispatch(removeItem(record.id))}
        />
      ),
    },
  ];
  return (
    <>
      <Modal
        open={isPortfolioOpen}
        onCancel={() => dispatch(setIsPortfolioOpen(false))}
        footer={null}
        width={1000}
      >
        <Title level={2} className={styles.title}>
          Портфель
        </Title>
        <Table<PortfolioItem>
          dataSource={portfolio}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
        <div className={styles.total}>
          <Text>Итого:</Text>
          <Text className={styles.totalValue}>{`$${totalValue.toFixed(
            2
          )}`}</Text>
        </div>
      </Modal>
    </>
  );
};

export default PortfolioModal;
