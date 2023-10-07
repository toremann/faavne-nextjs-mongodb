'use client';

import { SafeUser } from '@/app/types';
import { Portfolio, Stock } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface StocksCardProps {
  stock: Stock;
  currentUser?: SafeUser | null;
  scoreColor: (score: number) => string;
  portfolio: Portfolio
}

type Inputs = {
  stockName: string;
  stockAmount: number;
  stockDividend: number | null
};

const StockRow: React.FC<StocksCardProps> = ({ stock, scoreColor, currentUser, portfolio }) => {
  const router = useRouter()

  const stockAmount = portfolio.find(entry => entry.stockId === stock.isin)?.stockAmount || 0;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

 
const onSubmit: SubmitHandler<Inputs> = async (data) => {
  try {
    const stockAmountNumber = Number(data.stockAmount);

    const newData = {
      user: currentUser?.id,
      stockId: stock.isin,
      stockName: stock.name,
      stockAmount: stockAmountNumber,
    };

    console.log('onSubmit', newData);

    await axios.post('/api/portfolio', newData);
    router.refresh()
    toast.success('Oppdatert antall');

  } catch (error) {
    toast.error('Feil ved oppdatering av antall');
    console.error('Error updating portfolio:', error);
  }
};

  return (
    <tr className="border-b-2">
      <td className="w-full sm:w-auto hover:text-sky-700 cursor-pointer" onClick={() => router.push(`/stock/${stock.isin}`)}>{stock.name}</td>
      <td className="w-full sm:w-auto">{stock.dividend}</td>
      <td className="w-full sm:w-auto">
        <input
          className="border border-red-500 w-full sm:w-32"
          type="number"
          defaultValue={stockAmount}
          {...register('stockAmount', { required: true })}
        />
      </td>
      <td className="w-full sm:w-auto">{(stock.dividend * stockAmount).toFixed(2)} NOK</td>
      <td className="w-full sm:w-auto">
        <button className="bg-green-500 hover:bg-green-700 text-white rounded text-sm focus:outline-none focus:shadow-outline py-2 px-4" type="button" onClick={handleSubmit(onSubmit)}>
          Lagre
        </button>
      </td>
    </tr>
  );
};

export default StockRow;
