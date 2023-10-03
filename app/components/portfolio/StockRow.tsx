'use client';

import { SafeUser } from '@/app/types';
import { Stock } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';

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
  stockDividend: number | null;
};

const StockRow: React.FC<StocksCardProps> = ({ stock, scoreColor, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editableStockAmount, setEditableStockAmount] = useState<number>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className='border-b-2 border-black-500 mb-2'>
        <input disabled value={stock.name} {...register('stockName')} />
        <input disabled value={stock.dividend} {...register('stockDividend')} />
        <input className="border border-red-500" type="number" value={editableStockAmount} onChange={(e) => setEditableStockAmount(Number(e.target.value))} {...register('stockAmount', { required: true })} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit(onSubmit)}>
        Save
      </button>
      </form>
    </div>
  );
};

export default StockRow;
