import { Image, Layout } from "antd";
import { JSX } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const { Header } = Layout;

const MainLayout = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Image
          className={styles.image}
          src="/coincap_logo.png"
          preview={false}
          alt="Coincap"
          height={100}
          onClick={() => navigate("/")}
        />
      </Header>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
