import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/app/types';

import useLoginModal from './useLoginModal';

interface IUseFavorite {
  stockId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ stockId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(stockId);
  }, [currentUser, stockId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${stockId}`);
          toast.error('Fjernet aksje fra favoritter');
        } else {
          request = () => axios.post(`/api/favorites/${stockId}`);
          toast.success('Lagt til i favoritter');
        }

        await request();
        router.refresh();
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, hasFavorited, stockId, loginModal, router],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
