export interface Stock {
  symbol: String,

  company_info: {
    excluding_date: Date
    dividend_date: Date
  }
  instrument_info: {
    long_name: String
    symbol: String
    name: String
  }

  historical_returns_info:{
    yield_ytd: number
  }

  key_ratios_info: {
    dividend_per_share: number
    dividend_yield: number
  }

  price_info: {
    diff_pct: number,
    last: {
      price: number;
    };
  };

  stats: { rating: number }[];
  stock: {stats: {map: Function}};
}

export interface StocksProps {
  stocks: Stock[];
  query: string;
  setQuery: Function;
  serverDate: Date;
  filter: boolean;
  handleFilter: Function;
}
