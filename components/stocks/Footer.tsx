import { Stock } from "../../interfaces/stocks";
import { formatDistance } from 'date-fns';
import { nb } from 'date-fns/locale';

export const Footer = ({ stock, serverDate }: { stock: Stock; serverDate: Date }) => {
    return (
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-md-6">
              Excluding dato:
              <div className="h3">
                {stock.company_info.excluding_date
                  ? `${stock.company_info.excluding_date && new Date(stock.company_info.excluding_date).toLocaleDateString('en-GB')} ${'('}${formatDistance(
                      new Date(stock.company_info.excluding_date),
                      serverDate,
                      { locale: nb }
                    )}${')'}`
                  : 'Ingen dato'}
              </div>
            </div>
            <div className="col-md-6">
              Utbytte dato:
              <div className="h3">
                {stock.company_info.dividend_date
                  ? `${stock.company_info.dividend_date && new Date(stock.company_info.dividend_date).toLocaleDateString('en-GB')} ${'('}${formatDistance(
                      new Date(stock.company_info.dividend_date),
                      serverDate,
                      { locale: nb }
                    )}${')'}`
                  : 'Ingen dato'}
              </div>
            </div>
          </div>
  
          <div className="row">
            <div className="col-4 col-md-3 text-truncate">Utbytte per aksje:</div>
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