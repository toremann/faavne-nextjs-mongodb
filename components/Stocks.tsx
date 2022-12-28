import { differenceInMinutes, formatDistance } from "date-fns";
import Search from "./Search";
import { setColor } from "../utils/setColor";

const Stocks = ({
  stocks,
  query,
  setQuery,
  serverDate,
}: {
  setQuery: Function;
  query: String;
  stocks: any;
  serverDate: Date;
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
            <>
              <div>
                <div key={index} className="row mt-3">
                  {/* show on mobile */}
                  <div className="col text-muted d-lg-none d-block">
                    {stock.instrument_info.long_name}
                  </div>
                  <div className="col d-lg-none d-block">
                    {stock.price_info.last.price.toFixed(2)}NOK {" ("}
                    {stock.price_info.diff_pct}%{")"}
                  </div>
                </div>
              </div>
              {/* show on desktop */}
              <div className="row d-lg-flex d-none">
                <div className="col col-8 ">
                  <p className="m-0 text-muted ">
                    {stock.instrument_info.long_name}
                  </p>
                </div>
                <div className="col-2">Utbytte:</div>
                <div className="col-2">Rating:</div>
              </div>
              <div className="row row-cols-lg-5 row-cols-2 border-bottom justify-content-between justify-content-lg-between">
                {/* first */}
                <div className="col col-lg-2">
                  <p className="h1 font-weight-bold">
                    {stock.instrument_info.symbol}
                  </p>
                </div>
                {/* hide on lg, show on breakpoint */}
                <div className="col d-lg-none d-block">
                  <h1
                    className={`${setColor(
                      (stock.key_ratios_info.dividend_per_share /
                        stock.price_info.last.price) *
                        1000
                    )}`}
                  >
                    {stock.key_ratios_info.hasOwnProperty(
                      "dividend_per_share"
                    ) &&
                      stock.price_info.last.hasOwnProperty("price") &&
                      stock.price_info.last.price > 0 &&
                      Math.round(
                        (stock.key_ratios_info.dividend_per_share /
                          stock.price_info.last.price) *
                          1000
                      )}
                  </h1>
                </div>
                {/* second */}
                <div className="col col-lg-2">
                  <p
                    className={`h6 font-weight-bold
                  ${
                    differenceInMinutes(
                      new Date(stock.company_info.excluding_date),
                      serverDate
                    ) < 0
                      ? "text-danger"
                      : "text-success"
                  }
                  `}
                  >
                    {stock.company_info.excluding_date ? (
                      `EX: ${formatDistance(
                        new Date(stock.company_info.excluding_date),
                        new Date(),
                        { addSuffix: true }
                      )}`
                    ) : (
                      <h6 className="text-muted">EX: Date not set</h6>
                    )}
                  </p>
                  <p
                    className={`h6 font-weight-bold ${
                      differenceInMinutes(
                        new Date(stock.company_info.dividend_date),
                        serverDate
                      ) < 0
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    {stock.company_info.dividend_date ? (
                      `DD: ${formatDistance(
                        new Date(stock.company_info.dividend_date),
                        serverDate,

                        { addSuffix: true }
                      )}`
                    ) : (
                      <h6 className="text-muted">DD: Date not set</h6>
                    )}
                  </p>
                </div>
                {/* third */}
                <div className="col col-lg-2">
                  <p className={`h6`}>
                    {stock.company_info.excluding_date &&
                      new Date(
                        stock.company_info.dividend_date
                      ).toLocaleDateString("en-GB")}
                  </p>
                  <p className={`h6`}>
                    {stock.company_info.dividend_date &&
                      new Date(
                        stock.company_info.excluding_date
                      ).toLocaleDateString("en-GB")}
                  </p>
                </div>
                {/* fourth */}
                <div className="col col-lg-2 d-none d-lg-block">
                  <div
                    className={
                      stock.price_info.diff_pct > 0
                        ? "text-success text-right"
                        : "text-danger text-right"
                    }
                  >
                    <p className="h6">
                      {stock.price_info.last.price.toFixed(2)}NOK
                    </p>
                    <p className="h6">
                      {stock.price_info.diff_pct}%{" "}
                      <i
                        className={
                          stock.price_info.diff_pct > 0
                            ? "bi bi-arrow-up-circle"
                            : "bi bi-arrow-down-circle"
                        }
                      ></i>
                    </p>
                  </div>
                </div>
                {/* fifth - should be second on small devices*/}
                <div className="col col-lg-2 d-none d-lg-block">
                  <p className="h1">
                    {stock.key_ratios_info.dividend_per_share}
                  </p>
                </div>
                <div className="col col-lg-2 d-none d-lg-block">
                  <p
                    className={`h1 ${setColor(
                      (stock.key_ratios_info.dividend_per_share /
                        stock.price_info.last.price) *
                        1000
                    )}`}
                  >
                    {stock.key_ratios_info.hasOwnProperty(
                      "dividend_per_share"
                    ) &&
                      stock.price_info.last.hasOwnProperty("price") &&
                      stock.price_info.last.price > 0 &&
                      Math.round(
                        (stock.key_ratios_info.dividend_per_share /
                          stock.price_info.last.price) *
                          1000
                      )}
                  </p>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Stocks;
