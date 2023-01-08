export interface Stock {
    key_ratios_info: object;
    price_info: {
      last: {
        price: number;
      };
    };
    stats: { rating: number }[];
    stock: object;
  }