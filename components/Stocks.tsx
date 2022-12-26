import { formatDistance } from "date-fns";
import Search from "./Search";
import { setColor } from "../utils/setColor";

const Stocks = ({
  stocks,
  query,
  setQuery,
}: {
  setQuery: Function;
  query: String;
  stocks: any;
}) => {
  return (
    <>
      <div className="container mt-4 rounded">
        <Search stocks={stocks} query={query} setQuery={setQuery} />
        {stocks
          .filter((stock: any) => stock.price_info.last.price > 0)
          .sort((a: any, b: any) =>
            (a.key_ratios_info.dividend_per_share / a.price_info.last.price) *
              1000 <
            (b.key_ratios_info.dividend_per_share / b.price_info.last.price) *
              1000
              ? 1
              : -1
          )
          .map((stock: any, index: any) => (
            <div key={index} className="row flex-xs-column border-bottom mb-2">
              {/* first */}
              <div className="col-md-4">
                <h4 className="font-weight-bold">
                  {stock.instrument_info.symbol}
                </h4>
                <h6 className="text-muted">
                  {stock.instrument_info.long_name}
                </h6>
              </div>
              {/* second */}
              <div className="col">
                <h6 className="font-weight-bold">
                  {stock.company_info.dividend_date ? (
                    `DD: ${formatDistance(
                      new Date(stock.company_info.dividend_date),
                      new Date(),

                      { addSuffix: true }
                    )}`
                  ) : (
                    <h6 className="text-muted">Date not set</h6>
                  )}
                </h6>

                <h6 className="text-success">
                  {stock.company_info.excluding_date &&
                    new Date(
                      stock.company_info.dividend_date
                    ).toLocaleDateString("en-GB")}
                </h6>
              </div>
              {/* third */}
              <div className="col">
                <h6 className="font-weight-bold">
                  {stock.company_info.excluding_date ? (
                    `EX: ${formatDistance(
                      new Date(stock.company_info.excluding_date),
                      new Date(),
                      { addSuffix: true }
                    )}`
                  ) : (
                    <h6 className="text-muted">EX date not set</h6>
                  )}
                </h6>
                <h6 className="text-success">
                  {stock.company_info.dividend_date &&
                    new Date(
                      stock.company_info.excluding_date
                    ).toLocaleDateString("en-GB")}
                </h6>
              </div>
              {/* fourth */}
              <div className="col">
                <div
                  className={
                    stock.price_info.diff_pct > 0
                      ? "text-success text-right"
                      : "text-danger text-right"
                  }
                >
                  <h6>{stock.price_info.last.price.toFixed(2)}NOK</h6>
                  <h6>
                    {stock.price_info.diff_pct}%{" "}
                    <i
                      className={
                        stock.price_info.diff_pct > 0
                          ? "bi bi-arrow-up-circle"
                          : "bi bi-arrow-down-circle"
                      }
                    ></i>
                  </h6>
                </div>
              </div>
              {/* fifth - should be second on small devices*/}
              <div className="col-md-1"> 
                <h1
                  className={`${setColor(
                    (stock.key_ratios_info.dividend_per_share /
                      stock.price_info.last.price) *
                      1000
                  )}`}
                >
                  {stock.key_ratios_info.hasOwnProperty("dividend_per_share") &&
                    stock.price_info.last.hasOwnProperty("price") &&
                    stock.price_info.last.price > 0 &&
                    Math.round(
                      (stock.key_ratios_info.dividend_per_share /
                        stock.price_info.last.price) *
                        1000
                    )}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Stocks;
