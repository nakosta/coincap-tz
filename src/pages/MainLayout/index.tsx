import { Image, Layout } from "antd";
import { JSX } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css";

const { Header } = Layout;

const MainLayout = (): JSX.Element => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Image
          src="/coincap_logo.png"
          preview={false}
          alt="Coincap"
          height={100}
        />
      </Header>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
