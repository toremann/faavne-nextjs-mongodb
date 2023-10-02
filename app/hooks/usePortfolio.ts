import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/app/types';

import useLoginModal from './useLoginModal';

interface IusePortfolio {
  stockId: string;
  currentUser?: SafeUser | null;
}

const usePortfolio = ({ stockId, currentUser }: IusePortfolio) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const isAddedToPortfolio = useMemo(() => {
    const list = currentUser?.portfolioIds || [];

    return list.includes(stockId);
  }, [currentUser, stockId]);

  const togglePortfolio = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (isAddedToPortfolio) {
          request = () => axios.delete(`/api/portfolio/${stockId}`);
          toast.error('Removed stock from portfolio');
        } else {
          request = () => axios.post(`/api/portfolio/${stockId}`);
          toast.success('Added to portfolio');
        }

        await request();
        router.refresh();
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, isAddedToPortfolio, stockId, loginModal, router],
  );

  return {
    isAddedToPortfolio,
    togglePortfolio,
  };
};

export default usePortfolio;
