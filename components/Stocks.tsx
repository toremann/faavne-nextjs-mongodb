import { differenceInMinutes, formatDistance } from 'date-fns';
import Search from './Search';
import { setColor } from '../utils/setColor';
import { Stock } from '../interfaces/stocks';
import { checkRating } from '../utils/checkRating';

const Header = ({ stock }: {stock: Stock}) => {
  return (
    <div className="row">
      <div className="col-3">{stock.instrument_info.long_name}</div>
      <div className="col-3"></div>
      <div className="col-3">Utbytte</div>
      <div className="col-3">Rating</div>
    </div>
  );
};

const Body = ({ stock }: {stock: Stock}) => {
  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-3"></div>
      <div className="col-3"></div>
      <div className="col-3"></div>
    </div>
  );
};

const Footer = ({ stock }: {stock: Stock}) => {
  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-3"></div>
      <div className="col-3"></div>
      <div className="col-3"></div>
    </div>
  );
};

const Stocks = ({ stocks, query, setQuery, serverDate }: { setQuery: Function; query: String; stocks: Array<Stock>; serverDate: Date }) => {
  return (
    <>
      <div className="container mt-4 rounded ">
        <Search stocks={stocks} query={query} setQuery={setQuery} />
        {stocks
          .filter((stock: Stock) => stock.price_info.last.price > 0)
          .sort((a: Stock, b: Stock) => (a.stats[6].rating < b.stats[6].rating ? 1 : -1))
          .map((stock: any, index: number) => (
            <div key={index}>
              <div>
                <div className="row mt-3">
                  {/* show on mobile */}
                  <div className="col text-muted d-lg-none d-block">{stock.instrument_info.long_name}</div>
                  <div className={`col d-lg-none d-block list-inline list-group-flush ${stock.price_info.diff_pct > 0 ? 'text-success' : 'text-danger'}`}>
                    {stock.price_info.last.price.toFixed(2)}NOK{' '}
                    <li className={'list-inline-item'}>
                      {' ('}
                      {stock.price_info.diff_pct}%{')'}
                    </li>
                  </div>
                </div>
              </div>
              {/* show on desktop top row*/}
              <Header stock={stock}/>
              <div className="row d-lg-flex d-none justify-content-between justify-content-lg-between">
                <div className="col col-4 ">
                  <p className="m-0 text-muted">{stock.instrument_info.long_name}</p>
                </div>
                <div className="col-4 border-bottom">Utbytte</div>
                <div className="col-4 list-inline border-bottom">
                  Rating{' '}
                  <li className={`list-inline-item ${stock.stats[6].rating - stock.stats[5].rating > 0 ? 'text-success' : 'text-danger'}`}>
                    {checkRating(stock.stats[6].rating - stock.stats[5].rating)}
                  </li>
                </div>
              </div>
              {/* middle row */}
              <div className="row row-cols-lg-4 row-cols-2 justify-content-between justify-content-lg-between">
                {/* first */}
                <div className="col col-lg-2">
                  <p className="h1 font-weight-bold">{stock.instrument_info.symbol}</p>
                </div>
                {/* first hide on lg, show on breakpoint */}
                <div className="col d-lg-none d-block">
                  <h1 className={`${setColor(stock.stats[stock.stats.length - 1].rating)}`}>{stock.stats[stock.stats.length - 1].rating}</h1>
                </div>

                {/* second */}
                <div className="col col-lg-2 d-none d-lg-block">
                  <div className={stock.price_info.diff_pct > 0 ? 'text-success text-right' : 'text-danger text-right'}>
                    <p className="h6">{stock.price_info.last.price.toFixed(2)}NOK</p>
                    <p className="h6">
                      {stock.price_info.diff_pct}% <i className={stock.price_info.diff_pct > 0 ? 'bi bi-arrow-up-circle' : 'bi bi-arrow-down-circle'} />
                    </p>
                  </div>
                </div>
                {/* third - should be second on small devices*/}
                <div className="col col-lg-2 d-none d-lg-block">
                  <p className="h1">{stock.key_ratios_info.dividend_per_share}</p>
                </div>
                <div className="col col-lg-2 d-none d-lg-block">
                  <p className={`h1 ${setColor(stock.stats[stock.stats.length - 1].rating)}`}>{stock.stats[stock.stats.length - 1].rating}</p>
                </div>
              </div>
              <div className="row d-lg-flex d-none border-bottom justify-content-between justify-content-lg-between">
                <div className={`col h6 ${differenceInMinutes(new Date(stock.company_info.excluding_date), serverDate) < 0 ? 'text-danger' : 'text-success'}`}>
                  {stock.company_info.excluding_date && `EX: ${formatDistance(new Date(stock.company_info.excluding_date), serverDate, { addSuffix: true })}`}
                </div>

                <div className="col h6">{stock.company_info.excluding_date && new Date(stock.company_info.dividend_date).toLocaleDateString('en-GB')}</div>

                <div className={`col h6 ${differenceInMinutes(new Date(stock.company_info.dividend_date), serverDate) < 0 ? 'text-danger' : 'text-success'}`}>
                  {stock.company_info.dividend_date && `DD: ${formatDistance(new Date(stock.company_info.dividend_date), serverDate, { addSuffix: true })}`}
                </div>

                <div className="col h6">{stock.company_info.dividend_date && new Date(stock.company_info.excluding_date).toLocaleDateString('en-GB')}</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Stocks;
