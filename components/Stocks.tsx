import { differenceInMinutes, formatDistance } from "date-fns";

const setColor = (rating: number) => {
  if (rating >= 250) {
    return "custom-color-100";
  }
  if (rating >= 200) {
    return "custom-color-90";
  }
  if (rating >= 150) {
    return "custom-color-80";
  }
  if (rating >= 100) {
    return "custom-color-70";
  }
  if (rating >= 75) {
    return "custom-color-60";
  }
  if (rating >= 50) {
    return "custom-color-50";
  }
  if (rating >= 25) {
    return "custom-color-40";
  }
  if (rating <= 24) {
    return "custom-color-30";
  }
};

const Stocks = ({ stocks }: { stocks: any }) => {
  return (
    <>
      <div className="container mt-5">
        {stocks
          .sort((a: any, b: any) =>
            (a.key_ratios_info.dividend_per_share / a.price_info.last.price) *
              1000 <
            (b.key_ratios_info.dividend_per_share / b.price_info.last.price) *
              1000
              ? 1
              : -1
          )
          .slice(3)
          .map((stock: any, index: any) => (
            <div key={index} className="row border-bottom">
              <div className="col">
                <h4 className="font-weight-bold">
                  {stock.instrument_info.symbol}
                </h4>
                <h6 className="text-muted">
                  {stock.instrument_info.long_name}
                </h6>
              </div>
              <div className="col-md-auto">
                <h6
                  className={
                    differenceInMinutes(
                      new Date(stock.company_info.excluding_date),
                      new Date()
                    ) < 0
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {stock.company_info.excluding_date ? (
                    `EX: ${formatDistance(
                      new Date(stock.company_info.excluding_date),
                      new Date(),
                      { addSuffix: true }
                    )}`
                  ) : (
                    <h6 className="text-black-50">EX date not set</h6>
                  )}
                </h6>
                <h6
                  className={
                    differenceInMinutes(
                      new Date(stock.company_info.dividend_date),
                      new Date()
                    ) < 0
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {stock.company_info.dividend_date ? (
                    `DD: ${formatDistance(
                      new Date(stock.company_info.dividend_date),
                      new Date(),

                      { addSuffix: true }
                    )}`
                  ) : (
                    <h6 className="text-black-50">Divident date not set</h6>
                  )}
                </h6>
              </div>
              <div className="col-md-auto">
                <div
                  className={
                    stock.price_info.diff_pct > 0
                      ? "text-success text-right"
                      : "text-danger text-right"
                  }
                >
                  <h4>{stock.price_info.last.price.toFixed(2)}NOK</h4>
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
              <div className="col col-lg-2">
                <h1
                  className={`${setColor(
                    (stock.key_ratios_info.dividend_per_share /
                      stock.price_info.last.price) *
                      1000
                  )}`}
                >
                  {stock.key_ratios_info.hasOwnProperty("dividend_per_share") &&
                  stock.price_info.last.hasOwnProperty("price") &&
                  stock.price_info.last.price > 0
                    ? Math.round(
                        (stock.key_ratios_info.dividend_per_share /
                          stock.price_info.last.price) *
                          1000
                      )
                    : ""}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Stocks;
