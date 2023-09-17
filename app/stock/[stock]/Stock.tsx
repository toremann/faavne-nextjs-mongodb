'use client';

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';

import Container from '@/app/components/Container';

const Stock = ({ stock, currentUser }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">{stock.name}</div>
      </div>
    </Container>
  );
};

export default Stock;
