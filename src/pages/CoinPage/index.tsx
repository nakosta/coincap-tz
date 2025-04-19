import { JSX } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import Chart from "../../components/Chart";
import BackButton from "../../components/BackButton";
import TableCoin from "../../components/TableCoin";
import TitleCoin from "../../components/TitleCoin";
import ErrorText from "../../components/ErrorText";
import { useCoin } from "../../hooks/queries/useCoin";
import { useHistory } from "../../hooks/queries/useHistory";
import { errors } from "../../utils/utils";
import styles from "./index.module.css";

const CoinPage = (): JSX.Element => {
  const { id = "" } = useParams<{ id: string }>();

  const {
    data: coin,
    isLoading: isCoinLoading,
    isError: isCoinError,
    error: coinError,
  } = useCoin(id);

  const {
    data: history,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
    error: historyError,
  } = useHistory(id);

  if (isCoinLoading || isHistoryLoading) {
    return <Spin className={styles.spin} />;
  }

  if (isCoinError) {
    return (
      <ErrorText error={(coinError as Error)?.message || errors.getCoin} />
    );
  }

  if (isHistoryError) {
    return (
      <ErrorText
        error={(historyError as Error)?.message || errors.getHistory}
      />
    );
  }

  if (!coin || !history) {
    const error = !coin ? errors.getCoin : errors.getHistory;
    return <ErrorText error={error} />;
  }

  return (
    <div className={styles.container}>
      <TitleCoin coin={coin} />
      <TableCoin coin={coin} />
      <Chart history={history} />
      <BackButton />
    </div>
  );
};

export default CoinPage;
