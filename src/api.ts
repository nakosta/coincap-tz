import axios from "axios";

export type Coin = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string | null;
  maxSupply: string | null;
  marketCapUsd: string | null;
  volumeUsd24Hr: string | null;
  priceUsd: string | null;
  changePercent24Hr: string | null;
  vwap24Hr: string | null;
  explorer: string | null;
};

type ApiData = {
  data: Coin[];
  timestamp: number;
};

type CoinData = {
  data: Coin;
  timestamp: number;
};

export type History = {
  data: string;
  priceUsd: string;
  time: number;
};

type HistoryData = {
  data: History[];
  timestamp: number;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_COINCAP_API_KEY}`
  },
});

export const coinsApi = {
  async getCoins(): Promise<Coin[]> {
    const { data } = await apiClient.get<ApiData>("assets");
    return data.data;
  },
  async getCoin(id: string): Promise<Coin> {
    const { data } = await apiClient.get<CoinData>(`assets/${id}`);
    return data.data;
  },
  async getHistory(id: string): Promise<History[]> {
    const { data } = await apiClient.get<HistoryData>(
      `assets/${id}/history?interval=d1`
    );
    return data.data;
  },
  async getSearchCoins(query: string): Promise<Coin[]> {
    const { data } = await apiClient.get<ApiData>(`/assets?search=${query}`);
    return data.data;
  },
};