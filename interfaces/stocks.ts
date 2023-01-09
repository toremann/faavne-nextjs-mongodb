export interface Stock {
    instrument_info: {
      long_name: String
    }
    key_ratios_info: object;
    price_info: {
      last: {
        price: number;
      };
    };
    stats: { rating: number }[];
    stock: object;
  }