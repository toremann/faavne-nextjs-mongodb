import { format, formatDistance, isBefore } from 'date-fns';
import StocksUtilBox from './StocksUtilBox';

interface StocksDatesProps {
  dividendDate: number | null;
  exDate: number | null;
}

const StocksDates: React.FC<StocksDatesProps> = ({ dividendDate, exDate }) => {
  const currentDate = new Date();
  //@ts-ignore
  const isDividendDatePassed = isBefore(dividendDate, currentDate);
  //@ts-ignore
  const isExcludingDatePassed = isBefore(exDate, currentDate);

  return (
    <div className="p-2 my-2 flex flex-col">
      <div className="border-b text-lg font-bold">Dividend Date</div>
      <div className={`flex justify-between m-2 p-2 rounded ${isDividendDatePassed ? 'bg-red-500' : 'text-gray-600'} ${isDividendDatePassed && 'text-bold'}`}>
        {/* @ts-ignore */}
        <div className={`${isDividendDatePassed && 'font-bold'}`}>{format(dividendDate, 'dd/MM/yyyy')}</div>
        {/* @ts-ignore */}
        <div className={`${isDividendDatePassed && 'font-bold'}`}>{formatDistance(dividendDate, new Date(), { addSuffix: true })}</div>
      </div>
      <div className="border-b text-lg font-bold mt-2">Excluding Date</div>
      <div className={`flex justify-between m-2 p-2 rounded ${isExcludingDatePassed ? 'bg-red-500' : 'text-gray-600'}`}>
        {/* @ts-ignore */}
        <div className={`${isExcludingDatePassed && 'font-bold'}`}>{format(exDate, 'dd/MM/yyyy')}</div>
        {/* @ts-ignore */}
        <div className={`${isExcludingDatePassed && 'font-bold'}`}> {formatDistance(exDate, new Date(), { addSuffix: true })}</div>
      </div>
    </div>
  );
};

export default StocksDates;
