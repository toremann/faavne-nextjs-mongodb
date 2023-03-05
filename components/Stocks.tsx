import { formatDistance } from 'date-fns';
import { useState } from 'react';
import Search from './Search';
import { setColor } from '../utils/setColor';
import { Stock, StocksProps } from '../interfaces/stocks';
import { checkRating } from '../utils/checkRating';
import { translateSentence } from '../utils/translate';
import { nb } from 'date-fns/locale';

const Header = ({ stock }: { stock: Stock }) => {
  return (
    <div className="d-flex align-items-center justify-content-between m-4 mb-0">
      <div className="text-truncate">{stock.instrument_info.long_name}</div>
      <div className="">Rating</div>
    </div>
  );
};

const Body = ({ stock }: { stock: Stock }) => {
  return (
    <div className="d-flex align-items-center justify-content-between m-4 mt-0">
      <div className="h1 mr-2 col-3">{stock.instrument_info.symbol}</div>
      <div className={`col-5 ${stock.price_info.diff_pct > 0 ? 'text-success' : 'text-danger'}`}>
        <p className="h6">{stock.price_info.last.price.toFixed(2)}NOK</p>
        <p className="h6">
          {stock.price_info.diff_pct}% <i className={stock.price_info.diff_pct > 0 ? 'bi bi-arrow-up-circle' : 'bi bi-arrow-down-circle'} />
        </p>
      </div>
      <div>
        <h1 className={`h1 ${setColor(stock.stats[stock.stats.length - 1].rating)}`}>{stock.stats[stock.stats.length - 1].rating}</h1>
      </div>
    </div>
  );
};

const Footer = ({ stock, serverDate }: { stock: Stock; serverDate: Date }) => {
  return (
    <div className="row rounded border border-primary-subtle">
      <div className="col-12">
        <div className="row">
          <div className="col-md-6">Excluding dato:</div>
          <div className="col-md-6">Utbytte dato:</div>
        </div>

        <div className="row">
          <div className="col-md-6 h3">
            {stock.company_info.excluding_date &&
              `${stock.company_info.dividend_date && new Date(stock.company_info.excluding_date).toLocaleDateString('en-GB')} ${'('}${formatDistance(
                new Date(stock.company_info.excluding_date),
                serverDate,
                { locale: nb }
              )}${')'}`}
          </div>

          <div className="col-md-6 h3">
            {stock.company_info.dividend_date &&
              `${stock.company_info.excluding_date && new Date(stock.company_info.dividend_date).toLocaleDateString('en-GB')} ${'('}${formatDistance(
                new Date(stock.company_info.dividend_date),
                serverDate,
                { locale: nb }
              )}${')'}`}
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="row">
          <div className="col-4 col-md-3">Utbytte per aksje:</div>
          <div className="col-4 col-md-3">Yield:</div>
          <div className="col-4 col-md-3">Yield YTD:</div>
        </div>
        <div className="row">
          <div className="col-4 col-md-3 h3">{stock.key_ratios_info.dividend_per_share}</div>
          <div className="col-4 col-md-3 h3">{stock.key_ratios_info.dividend_yield}</div>
          <div className="col-4 col-md-3 h3">{stock.historical_returns_info.yield_ytd}</div>
        </div>
      </div>
    </div>
  );
};

const Stocks = ({ stocks, query, setQuery, serverDate, filter, handleFilter }: StocksProps) => {
  const [isBodyExpanded, setIsBodyExpanded] = useState(stocks.map(() => false));

  const toggleBodyExpansion = (index: number) => {
    const updatedExpandedState = [...isBodyExpanded];
    updatedExpandedState[index] = !isBodyExpanded[index];
    setIsBodyExpanded(updatedExpandedState);
  };

  return (
    <div className="container mt-4 rounded-top bg-light">
      <Search stocks={stocks} query={query} setQuery={setQuery} filter={filter} handleFilter={handleFilter} />
      {stocks
        .filter((stock: Stock) => stock.price_info.last.price > 0)
        .sort((a: Stock, b: Stock) => ((a.stats[6]?.rating ?? 0) < (b.stats[6]?.rating ?? 0) ? 1 : -1))
        .map((stock: Stock, index: number) => (
          <div key={index} className="border rounded m-4">
            <Header stock={stock} />
            <Body stock={stock} />
            <div className="d-grid gap-2 m-4">
              <button className="btn btn-outline-primary" onClick={() => toggleBodyExpansion(index)}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="mr-2">Utbytte</div>
                  <div>{isBodyExpanded[index] ? <i className="bi bi-caret-up-fill" /> : <i className="bi bi-caret-down-fill" />}</div>
                </div>
              </button>

              {isBodyExpanded[index] && <Footer stock={stock} serverDate={serverDate} />}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Stocks;
