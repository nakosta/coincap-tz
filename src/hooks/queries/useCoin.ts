import { useQuery } from "@tanstack/react-query";
import { coinsApi } from "../../api";

export const useCoin = (id: string) => {
  return useQuery({
    queryKey: ['coin', id],
    queryFn: () => coinsApi.getCoin(id),
    enabled: !!id,
  });
};
