import { Stock } from "../../interfaces/stocks";

export const Header = ({ stock }: { stock: Stock }) => {
    return (
      <div className="d-flex align-items-center justify-content-between m-4 mb-0 text-white">
        <div className="text-truncate">{stock.instrument_info.long_name}</div>
        <div className="">Rating</div>
      </div>
    );
  };