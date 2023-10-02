'use client';

import { SafeUser } from '@/app/types';
import { Stock } from '@prisma/client';
import { useState } from 'react'

interface StocksCardProps {
  stock: Stock;
  currentUser?: SafeUser | null;
  scoreColor: (score: number) => string;
}

const StockRow: React.FC<StocksCardProps> = ({ stock, scoreColor }) => {

  // State to manage the editable stock amount
  const [editableStockAmount, setEditableStockAmount] = useState<number>(100);

  const handleStockAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure that the entered value is a number
    const newAmount = parseFloat(event.target.value);

    if (!isNaN(newAmount)) {
      setEditableStockAmount(newAmount);
    }
  };

  const handleStockAmountBlur = () => {
    // You can add logic here for what to do when the input loses focus
    console.log('Stock amount updated:', editableStockAmount);
  };

  return (
    <>
      <tbody>
        <tr>
          <td>{stock.name}</td>
          <td>
            <input
              type="number"
              value={editableStockAmount}
              onChange={handleStockAmountChange}
              onBlur={handleStockAmountBlur}
              className="w-16 px-2 py-1 border rounded"
            />
          </td>
          <td>{stock.dividend} NOK</td>
        </tr>
      </tbody>
    </>
  );
};

export default StockRow;
