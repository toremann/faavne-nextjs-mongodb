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
  updateTotal: (amount: number) => void;
}

type Inputs = {
  stockName: string;
  stockAmount: number;
  stockDividend: number | null
};

const StockRow: React.FC<StocksCardProps> = ({ stock, scoreColor, currentUser, updateTotal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editableStockAmount, setEditableStockAmount] = useState<number | null>(null);
  const [calculatedAmount, setCalculatedAmount] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newData = {
      stockAmount: data.stockAmount,
      stockName: stock.name,
      stockDividend: stock.dividend,
    };
    console.log(newData);

    const newCalculatedAmount = data.stockAmount * stock.dividend;
    setCalculatedAmount(newCalculatedAmount);

    updateTotal(newCalculatedAmount);
  };

  useEffect(() => {
    if (editableStockAmount !== null) {
      const newCalculatedAmount = editableStockAmount * stock.dividend;
      setCalculatedAmount(newCalculatedAmount);

      updateTotal(newCalculatedAmount);
    }
  }, [editableStockAmount, stock.dividend, updateTotal]);

  return (
    <tr className="border-b-2">
      <td className="w-full sm:w-auto">{stock.name}</td>
      <td className="w-full sm:w-auto">{stock.dividend}</td>
      <td className="w-full sm:w-auto">
        <input
          className="border border-red-500 w-full sm:w-32"
          type="number"
          value={editableStockAmount}
          onChange={(e) => setEditableStockAmount(Number(e.target.value))}
          {...register('stockAmount', { required: true })}
        /> 
      </td>
      <td className="w-full sm:w-auto">{calculatedAmount && `${calculatedAmount?.toFixed(2)} NOK`}</td>
      <td className="w-full sm:w-auto">
        <button className="bg-green-500 hover:bg-green-700 text-white rounded text-sm focus:outline-none focus:shadow-outline py-2 px-4" type="button" onClick={handleSubmit(onSubmit)}>
          Lagre
        </button>
      </td>
    </tr>
  );
};

export default StockRow;
