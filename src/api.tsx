import axios from "axios";
import type { Coin } from "./pages/CoinList";

type ApiData = {
  data: Coin[];
  timestamp: number;
};

type ApiResponse = {
  data: ApiData;
  status: number;
  statusText: string;
  headers: object;
  config: object;
  request: object;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const coinsApi = {
  async getCoins(): Promise<Coin[]> {
    const response = await apiClient.get<ApiResponse>("assets");
    console.log(response);
    return response.data.data;
  },
};
