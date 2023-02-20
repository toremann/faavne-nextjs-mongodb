import { formatDistance } from 'date-fns';
import Search from './Search';
import { setColor } from '../utils/setColor';
import { Stock } from '../interfaces/stocks';
import { checkRating } from '../utils/checkRating';

const Header = ({ stock }: { stock: Stock }) => {
  return (
    <div className="row bg-light border-top">
      <div className="col-6 text-truncate">{stock.instrument_info.long_name}</div>
      <div className="col-3">Utbytte</div>
      <div className="col-3">Rating {checkRating((stock.stats[6]?.rating ?? 0) - (stock.stats[5]?.rating ?? 0))}</div>
    </div>
  );
};

const Body = ({ stock }: { stock: Stock }) => {
  return (
    <div className="row bg-light">
      <div className="col-3 h1">{stock.instrument_info.symbol}</div>
      <div className={`col-3 ${stock.price_info.diff_pct > 0 ? 'text-success' : 'text-danger'}`}>
        <p className="h6">{stock.price_info.last.price.toFixed(2)}NOK</p>
        <p className="h6">
          {stock.price_info.diff_pct}% <i className={stock.price_info.diff_pct > 0 ? 'bi bi-arrow-up-circle' : 'bi bi-arrow-down-circle'} />
        </p>
      </div>
      <div className="col-3 h1">{stock.key_ratios_info.dividend_per_share}</div>
      <div className={`col-3`}>
        <h1 className={`h1 ${setColor(stock.stats[stock.stats.length - 1].rating)}`}>{stock.stats[stock.stats.length - 1].rating}</h1>
      </div>
    </div>
  );
};

const Footer = ({ stock, serverDate }: { stock: Stock; serverDate: Date }) => {
  return (
    <div className="row sm-col bg-warning bg-gradient rounded-bottom">
      <div className="col-6">
        {stock.company_info.excluding_date &&
          `Excluding date: ${stock.company_info.dividend_date && new Date(stock.company_info.excluding_date).toLocaleDateString('en-GB')} ${'('}${formatDistance(
            new Date(stock.company_info.excluding_date),
            serverDate,
            { addSuffix: true }
          )}${')'}`}
      </div>
      <div className="col-6">
        {stock.company_info.dividend_date &&
          `Divident date: ${stock.company_info.excluding_date && new Date(stock.company_info.dividend_date).toLocaleDateString('en-GB')} ${'('}${formatDistance(
            new Date(stock.company_info.dividend_date),
            serverDate,
            { addSuffix: true }
          )}${')'}`}
      </div>
    </div>
  );
};

const Stocks = ({
  stocks,
  query,
  setQuery,
  serverDate,
  filter,
  handleFilter,
}: {
  setQuery: Function;
  query: String;
  stocks: Array<Stock>;
  serverDate: Date;
  filter: Boolean;
  handleFilter: Function;
}) => {
  return (
    <div className="container mt-4 rounded-top ">
      <Search stocks={stocks} query={query} setQuery={setQuery} filter={filter} handleFilter={handleFilter} />
      {stocks
        .filter((stock: Stock) => stock.price_info.last.price > 0)
        .sort((a: Stock, b: Stock) => ((a.stats[6]?.rating ?? 0) < (b.stats[6]?.rating ?? 0) ? 1 : -1))
        .map((stock: Stock, index: number) => (
          <div key={index} className="m-4 rounded">
            <Header stock={stock} />
            <Body stock={stock} />
            <Footer stock={stock} serverDate={serverDate} />
          </div>
        ))}
    </div>
  );
};

export default Stocks;
