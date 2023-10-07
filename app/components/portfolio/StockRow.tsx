'use client';

import { SafeUser } from '@/app/types';
import { Stock } from '@prisma/client';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface StocksCardProps {
  stock: Stock;
  currentUser?: SafeUser | null;
  scoreColor: (score: number) => string;
}

type Inputs = {
  stockName: string;
  stockAmount: number;
  stockDividend: number | null
};

const StockRow: React.FC<StocksCardProps> = ({ stock, scoreColor, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

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

    console.log(newData);

    // await axios.post('/api/portfolio', newData);

    toast.success('Oppdatert antall');

  } catch (error) {
    toast.error('Feil ved oppdatering av antall');
    console.error('Error updating portfolio:', error);
  }
};

  return (
    <tr className="border-b-2">
      <td className="w-full sm:w-auto">{stock.name}</td>
      <td className="w-full sm:w-auto">{stock.dividend}</td>
      <td className="w-full sm:w-auto">
        <input
          className="border border-red-500 w-full sm:w-32"
          type="number"
          {...register('stockAmount', { required: true })}
        />
      </td>
      <td className="w-full sm:w-auto">NOK</td>
      <td className="w-full sm:w-auto">
        <button className="bg-green-500 hover:bg-green-700 text-white rounded text-sm focus:outline-none focus:shadow-outline py-2 px-4" type="button" onClick={handleSubmit(onSubmit)}>
          Lagre
        </button>
      </td>
    </tr>
  );
};

export default StockRow;
