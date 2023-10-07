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

      console.log('onSubmit', newData);

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
  }, [onSubmit]);

  return (
    <tr className="border-b-2">
      <td className="w-full sm:w-auto hover:text-sky-700 cursor-pointer" onClick={() => router.push(`/stock/${stock.isin}`)}>
        {stock.name}
      </td>
      <td className="w-full sm:w-auto">{stock.dividend}</td>
      <td className="w-full sm:w-auto">
        <input className="border border-red-500 w-full sm:w-32" type="number" defaultValue={stockAmount} {...register('stockAmount', { required: true })} />
      </td>
      <td className="w-full sm:w-auto">{dividendAmount.toFixed(2)} NOK</td>
      <td className="w-full sm:w-auto">
        <button className="bg-green-500 hover:bg-green-700 text-white rounded text-sm focus:outline-none focus:shadow-outline py-2 px-4" type="button" onClick={handleSubmit(onSubmit)}>
          Lagre
        </button>
      </td>
    </tr>
  );
};

export default StockRow;
