import { JSX, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import PopularCoins from "../../components/PopularCoins";
import TotalMoney from "../../components/TotalMoney";
import PortfolioModal from "../../components/PortfolioModal";
import { useAppDispatch } from "../../hooks/hooks";
import { axiosCoins } from "../../redux/slices/coinsSlice";
import styles from "./index.module.css";

const { Header } = Layout;

const MainLayout = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(axiosCoins());
  }, [dispatch]);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <PopularCoins />
        <TotalMoney />
      </Header>
      <Outlet />
      <PortfolioModal />
    </Layout>
  );
};

export default MainLayout;
