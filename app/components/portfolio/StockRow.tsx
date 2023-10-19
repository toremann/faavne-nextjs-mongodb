'use client';

import { SafeUser } from '@/app/types';
import { Portfolio, Stock } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useEffect } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import scoreColorIcon from '@/app/utils/scoreColorIcon';

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

  const dividendAmount = stock.dividend * stockAmount;

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
    <tr className="border-b-2 border-gray-300 dark:border-gray-500 dark:hover:border-orange-500 dark:bg-gray-800/75 dark:hover:bg-gray-800">
      <td className="pl-2 p-2 text-sm md:text-base hover:text-sky-700 cursor-pointer dark:text-gray-600" onClick={() => router.push(`/stock/${stock.isin}`)}>
        <div className="flex flex-row items-center gap-2">
          <div>
            <BsCircleFill size={10} className={`${scoreColorIcon(stock.normalizeScore)}`} />
          </div>
          <div className="font-bold dark:text-white">{stock.symbol}</div>
        </div>
        {stock.name}
      </td>
      <td className="text-sm dark:text-white md:text-base">
        <p className="font-bold">{dividendAmount.toFixed(2)} NOK</p>
        {stock.dividend} *
        <input
          className="dark:bg-black w-20 border-b-2 focus:border-none border-dotted text-center border-gray-400 "
          type="number"
          defaultValue={stockAmount}
          {...register('stockAmount', { required: true })}
        />
      </td>
      <td className="">
        <button className="text-xs md:text-sm bg-green-500 hover:bg-green-700 text-white rounded focus:outline-none focus:shadow-outline py-2 px-4" type="button" onClick={handleSubmit(onSubmit)}>
          Lagre
        </button>
      </td>
    </tr>
  );
};

export default StockRow;
