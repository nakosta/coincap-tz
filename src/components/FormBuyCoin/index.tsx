import { JSX } from "react";
import { Button, Form, InputNumber, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItem } from "../../redux/slices/portfolioSlice";
import { selectCoin } from "../../redux/selectors/selectors";

import styles from "./index.module.css";

const FormBuyCoin = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const coin = useAppSelector(selectCoin);

  const onFinish = (values: { amount: number }) => {
    if (!coin) return;

    const operation = {
      quantity: values.amount,
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
    <div className={styles.buyCoin}>
      <div className={styles.text}>Введите количество:</div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}
      >
        <Form.Item
          name="amount"
          rules={[
            {
              validator: (_, value) => {
                if (value === undefined || value < 0.0001) {
                  return Promise.reject("Введите число от 0.0001");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            className={styles.input}
            step={0.0001}
            onKeyDown={(e) => {
              if (
                !/^[\d.]$/.test(e.key) &&
                e.key !== "Backspace" &&
                e.key !== "ArrowLeft" &&
                e.key !== "ArrowRight" &&
                e.key !== "Delete"
              ) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Купить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormBuyCoin;
