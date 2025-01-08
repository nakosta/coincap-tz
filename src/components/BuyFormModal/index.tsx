import { JSX } from "react";
import { Modal, Form, Button, Typography, InputNumber, message } from "antd";
import {
  setIsBuyFormOpen,
  setSelectedCoin,
} from "../../redux/slices/isBuyFormOpenSlice";
import { addItem } from "../../redux/slices/portfolioSlice";
import {
  selectIsBuyFormOpen,
  selectSelectedCoin,
} from "../../redux/selectors/selectors";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { errors } from "../../utils/utils";
import styles from "./index.module.css";

const { Text } = Typography;

const BuyFormModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isBuyFormOpen = useAppSelector(selectIsBuyFormOpen);
  const selectedCoin = useAppSelector(selectSelectedCoin);
  const [form] = Form.useForm();

  const onClose = () => {
    dispatch(setIsBuyFormOpen(false));
    dispatch(setSelectedCoin(null));
    form.resetFields();
  };

  const onFinish = (values: { amount: string }) => {
    if (!selectedCoin) {
      message.error(errors.selectedCoin);
      return;
    }

    const operation = {
      quantity: parseFloat(values.amount),
      priceAtAddition: parseFloat(selectedCoin.priceUsd || "0"),
    };

    dispatch(
      addItem({
        id: selectedCoin.id,
        name: selectedCoin.name,
        operation,
      })
    );

    onClose();
    message.success(`${selectedCoin.name} успешно добавлена в портфель.`);
  };

  return (
    <Modal
      open={isBuyFormOpen}
      onCancel={onClose}
      footer={null}
      width={1000}
      className={styles.buyCoin}
    >
      <Text className={styles.title}>
        Купить{" "}
        <span className={`${styles.title} ${styles.red}`}>
          {selectedCoin?.name}
        </span>
      </Text>
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
            min={0.01}
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
    </Modal>
  );
};

export default BuyFormModal;
