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

export type History = {
  data: string;
  priceUsd: string;
  time: number;
};

type ApiData = {
  data: Coin[];
  timestamp: number;
};

type CoinData = {
  data: Coin;
  timestamp: number;
};

type HistoryData = {
  data: History[];
  timestamp: number;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
};

type PriceUpdate = { [assetId: string]: string };

export const pricesApi = {
  subscribeToPrices(ids: string[], onMessage: (data: PriceUpdate) => void) {
    const wsUrl = import.meta.env.VITE_WS_URL;
    const ws = new WebSocket(`${wsUrl}${ids.join(",")}`);
    ws.onmessage = (event) => {
      const data: PriceUpdate = JSON.parse(event.data);
      onMessage(data);
    };
    return ws;
  },
};
