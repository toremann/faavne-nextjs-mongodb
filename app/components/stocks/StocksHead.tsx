'use client';

interface StockHeadProps {
  title: string;
  subtitle: string;
  price: number;
  pct: number | null;
}

const StockHead: React.FC<StockHeadProps> = ({ title, subtitle, price, pct }) => {
  return (
    <>
      <div className="flex justify-between items-start">
        <div className="text-start">
          <div className="text:text-sm md:text-2xl font-bold dark:text-white">{title}</div>
          <div className="font-light text-neutral-500">{subtitle}</div>
        </div>
        <div>
          <div className="text:text-sm md:text-2xl font-bold text-right text-blue-800">{price.toFixed(2)} NOK</div>
          {pct !== null && (
            <div className={`text-light text-right ${pct > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {pct > 0 ? '+' : ''}
              {pct}%
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StockHead;
