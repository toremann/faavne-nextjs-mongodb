'use client';

import { SafeUser } from '@/app/types';
import { Portfolio, Stock } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useEffect } from 'react';

interface StocksRowProps {
  stock: Stock;
  currentUser?: SafeUser | null;
  portfolio: Portfolio[];
  updateTotalDividendAmount: () => void;
}

type Inputs = {
  stockName: string;
  stockAmount: number;
  stockDividend: number;
};

const StockRow: React.FC<StocksRowProps> = ({ stock, currentUser, portfolio, updateTotalDividendAmount }) => {
  const router = useRouter();

  const portfolioEntry = portfolio.find((entry) => entry.stockId === stock.isin);
  const stockAmount = portfolioEntry ? portfolioEntry.stockAmount : 0;

  const dividendAmount = stock.dividend * stockAmount

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const stockAmountNumber = Number(data.stockAmount);

      if (stockAmountNumber < 0) {
        toast.error('Verdi kan ikke være negativ');
        return;
      }

      const newData = {
        user: currentUser?.id,
        stockId: stock.isin,
        stockName: stock.name,
        stockAmount: stockAmountNumber,
      };

      await axios.post('/api/portfolio', newData);
      router.refresh();
      toast.success('Oppdatert antall');

    } catch (error) {
      toast.error('Feil ved oppdatering av antall');
      console.error('Error updating portfolio:', error);
    }
  };

  useEffect(() => {
    updateTotalDividendAmount();
    // check dependecy or use callback (?)
  }, [onSubmit, updateTotalDividendAmount]);

  return (
    <tr className="border-b-2">
      <td className="text-xs md:text-base hover:text-sky-700 cursor-pointer" onClick={() => router.push(`/stock/${stock.isin}`)}>
        <p className='font-bold'>{stock.symbol}</p>
        {stock.name}
      </td>
      <td className="text-xs md:text-base">{stock.dividend}</td>
      <td className="text-xs md:text-base">
        <input className="w-32" type="number" defaultValue={stockAmount} {...register('stockAmount', { required: true })} />
      </td>
      <td className="text-xs md:text-base">{dividendAmount.toFixed(2)} NOK</td>
      <td className="">
        <button className="text-xs md:text-sm bg-green-500 hover:bg-green-700 text-white rounded focus:outline-none focus:shadow-outline py-2 px-4" type="button" onClick={handleSubmit(onSubmit)}>
          Lagre
        </button>
      </td>
    </tr>
  );
};

export default StockRow;
