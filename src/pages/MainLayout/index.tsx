import { JSX } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import PopularCoins from "../../components/PopularCoins";
import TotalMoney from "../../components/TotalMoney";
import styles from "./index.module.css";

const { Header } = Layout;

const MainLayout = (): JSX.Element => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <PopularCoins />
        <TotalMoney />
      </Header>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
