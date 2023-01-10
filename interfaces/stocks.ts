export interface Stock {
  company_info: {
    excluding_date: Date
    dividend_date: Date
  }
  instrument_info: {
    long_name: String
    symbol: String
  }

  key_ratios_info: {
    dividend_per_share: number
  }

  price_info: {
    diff_pct: number,
    last: {
      price: number;
    };
  };

  stats: { rating: number }[];
  stock: object;
}