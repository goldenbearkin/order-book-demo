export type Price = string;
export type Size = string;
export type Side = "buy" | "sell";
export type Ask = [Price, Size];
export type Bid = [Price, Size];

export interface Snapshot {
  type: "snapshot";
  product_id: string;
  asks: Ask[];
  bids: Bid[];
}

export interface L2Update {
  type: "l2update";
  product_id: string;
  changes: [Side, Price, Size][];
}

export type Level2Stream = Snapshot | L2Update;

export interface OrderBook {
  asks: { [id: Price]: Size };
  bids: { [id: Price]: Size };
  askIds: Price[];
  bidIds: Price[];
}
