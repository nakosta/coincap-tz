import { useQuery } from '@tanstack/react-query';
import { coinsApi } from '../../api';

export const useCoins = () => {
  return useQuery({
    queryKey: ['coins'],
    queryFn: coinsApi.getCoins,
    refetchInterval: 10000,
  });
};
