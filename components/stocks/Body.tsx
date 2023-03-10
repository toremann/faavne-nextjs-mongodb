import { Stock } from "../../interfaces/stocks";
import { recalculateRating } from "../../utils/rating";
import { setColor } from "../../utils/setColor";

export const Body = ({ stock }: { stock: Stock }) => {
    const rating = recalculateRating(stock.stats[stock.stats.length - 1].rating);
  
    return (
      <div className="d-flex align-items-center justify-content-between m-4 mt-0 text-white">
        <div className="h1 mr-2 col-3">{stock.instrument_info.symbol}</div>
        <div className={`col-5 ${stock.price_info.diff_pct > 0 ? 'text-success' : 'text-danger'}`}>
          <p className="h6">{stock.price_info.last.price.toFixed(2)}NOK</p>
          <p className="h6">
            {stock.price_info.diff_pct}% <i className={stock.price_info.diff_pct > 0 ? 'bi bi-arrow-up-circle' : 'bi bi-arrow-down-circle'} />
          </p>
        </div>
        <div>
          <h1 className={`h1 ${setColor(rating)}`}>{rating}</h1>
        </div>
      </div>
    );
  };