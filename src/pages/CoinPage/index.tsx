import { useEffect, JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Table,
  Button,
  Form,
  InputNumber,
  Spin,
  message,
} from "antd";
import Chart from "../../components/Chart";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { axiosCoin } from "../../redux/slices/coinSlice";
import { axiosHistory } from "../../redux/slices/historySlice";
import { addItem } from "../../redux/slices/portfolioSlice";
import {
  selectCoin,
  selectCoinStatus,
  selectCoinError,
} from "../../redux/selectors/selectors";
import {
  priceUsdStr,
  billionStr,
  millionStr,
  changePercentStr,
} from "../../utils/utils";

import styles from "./index.module.css";

const { Text, Link } = Typography;

const CoinPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const coin = useAppSelector(selectCoin);
  const status = useAppSelector(selectCoinStatus);
  const error = useAppSelector(selectCoinError);

  useEffect(() => {
    if (id) {
      dispatch(axiosCoin(id));
      dispatch(axiosHistory(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <Spin />;
  }

  if (status === "failed" || !coin) {
    return (
      <Text type="danger" className={styles.error}>
        {error}
      </Text>
    );
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

  const onFinish = (values: { amount: string }) => {
    if (!coin) return;

    const operation = {
      quantity: parseFloat(values.amount),
      priceAtAddition: parseFloat(coin.priceUsd || "0"),
    };

    dispatch(
      addItem({
        id: coin.id,
        name: coin.name,
        operation,
      })
    );

    form.resetFields();
    message.success(`${coin.name} успешно добавлена в портфель.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Text type="danger" className={styles.symbol}>
          {coin.symbol}
        </Text>
        <Text type="danger" className={styles.name}>
          {coin.name}
        </Text>
      </div>

      <div className={styles.buyCoin}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
        >
          <Form.Item
            label={<Text className={styles.text}>Введите количество:</Text>}
            name="amount"
            rules={[
              { required: true, message: "Пожалуйста, введите количество!" },
            ]}
          >
            <InputNumber
              min={0}
              step={0.01}
              stringMode
              className={styles.input}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Купить
            </Button>
          </Form.Item>
        </Form>
      </div>

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

      <Chart />

      <Button type="primary" danger onClick={() => navigate("/")}>
        ← Назад
      </Button>
    </div>
  );
};

export default CoinPage;
