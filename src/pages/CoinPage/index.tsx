import { useEffect, JSX } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import Chart from "../../components/Chart";
import FormBuyCoin from "../../components/FormBuyCoin";
import BackButton from "../../components/BackButton";
import TableCoin from "../../components/TableCoin";
import TitleCoin from "../../components/TitleCoin";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { axiosCoin } from "../../redux/slices/coinSlice";
import { axiosHistory } from "../../redux/slices/historySlice";
import { selectCoinStatus } from "../../redux/selectors/selectors";

import styles from "./index.module.css";

const CoinPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectCoinStatus);

  useEffect(() => {
    if (id) {
      dispatch(axiosCoin(id));
      dispatch(axiosHistory(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <Spin className={styles.spin} />;
  }

  return (
    <div className={styles.container}>
      <TitleCoin />
      <FormBuyCoin />
      <TableCoin />
      <Chart />
      <BackButton />
    </div>
  );
};

export default CoinPage;
