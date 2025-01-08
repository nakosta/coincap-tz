import { JSX } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CoinList from "./pages/CoinList";
import CoinPage from "./pages/CoinPage";

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<CoinList />} />
        <Route path="/:id" element={<CoinPage />} />
      </Route>
    </Routes>
  );
};

export default App;
