export interface TickerStream {
  type: "ticker";
  trade_id: number;
  sequence: number;
  time: string;
  product_id: string;
  price: string;
  side: "buy" | "sell";
  last_size: string;
  best_bid: string;
  best_ask: string;
}

export interface Ticker {
  productId: string;
  price: string;
  comparison: "up" | "level" | "down";
}
