import { useQuery } from "@tanstack/react-query";
import { coinsApi } from "../../api";

export const useHistory = (id: string) => {
  return useQuery({
    queryKey: ["history", id],
    queryFn: () => coinsApi.getHistory(id),
    enabled: !!id,
  });
};
