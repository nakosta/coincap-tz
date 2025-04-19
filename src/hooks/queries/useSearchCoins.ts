import { useQuery } from "@tanstack/react-query";
import { coinsApi } from "../../api";

export const useSearchCoins = (query: string) => {
  return useQuery({
    queryKey: ["searchCoins", query],
    queryFn: () => coinsApi.getSearchCoins(query),
    enabled: !!query,
  });
};
