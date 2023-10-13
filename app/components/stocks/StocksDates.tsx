import { format, formatDistance, isBefore } from 'date-fns';
import { nb } from 'date-fns/locale';

interface StocksDatesProps {
  dividendDate: number | null;
  exDate: number | null;
}

const StocksDates: React.FC<StocksDatesProps> = ({ dividendDate, exDate }) => {
  const currentDate = new Date();
  const isDividendDatePassed = dividendDate ? isBefore(dividendDate, currentDate) : false;
  const isExcludingDatePassed = exDate ? isBefore(exDate, currentDate) : false;

  return (
    <div className="p-2 my-2 flex flex-col">
      <div className="border-b text-lg font-bold dark:text-white">Utbytte dato</div>
      {dividendDate ? (
        <div className={`flex justify-between m-2 p-2  rounded ${isDividendDatePassed ? 'bg-red-500' : 'bg-slate-100'} ${isDividendDatePassed && 'text-bold'}`}>
          <div className={`${isDividendDatePassed && 'font-bold'}`}>{format(dividendDate, 'dd/MM/yyyy')}</div>
          <div className={`${isDividendDatePassed && 'font-bold'}`}>{formatDistance(dividendDate, new Date(), { addSuffix: true, locale: nb })}</div>
        </div>
      ) : (
        <div className="m-2 p-2 text-gray-600">Dato ikke satt</div>
      )}

      <div className="border-b text-lg font-bold mt-2 dark:text-white">Excluding dato</div>
      {exDate ? (
        <div className={`flex justify-between m-2 p-2  rounded ${isExcludingDatePassed ? 'bg-red-500' : 'bg-slate-100'}`}>
          <div className={`${isExcludingDatePassed && 'font-bold'}`}>{format(exDate, 'dd/MM/yyyy')}</div>
          <div className={`${isExcludingDatePassed && 'font-bold'}`}> {formatDistance(exDate, new Date(), { addSuffix: true, locale: nb })}</div>
        </div>
      ) : (
        <div className="m-2 p-2 text-gray-600">Dato ikke satt</div>
      )}
    </div>
  );
};

export default StocksDates;
