import { OrderBook, Snapshot, L2Update } from "./model";
import { parseOrderBook, updateOrderBook } from "./utils";

test("should return empty OrderBook", () => {
  const mockSnapshot: Snapshot = {
    type: "snapshot",
    product_id: "BTC-USD",
    asks: [],
    bids: [],
  };
  const orderBook = parseOrderBook(mockSnapshot);

  const expected: OrderBook = {
    asks: {},
    bids: {},
    askIds: [],
    bidIds: [],
  };

  expect(expected).toEqual(orderBook);
});

test("should parse OrderBook correctly", () => {
  // Given
  const mockSnapshot: Snapshot = {
    type: "snapshot",
    product_id: "BTC-USD",
    asks: [
      ["1.1", "0.1"],
      ["1.2", "0.2"],
      ["1.3", "0.3"],
      ["1.4", "0.4"],
    ],
    bids: [
      ["0.9", "0.9"],
      ["0.8", "0.8"],
      ["0.7", "0.7"],
      ["0.6", "0.6"],
    ],
  };
  // When
  const orderBook = parseOrderBook(mockSnapshot);

  // Then
  const expected: OrderBook = {
    asks: { "1.1": "0.1", "1.2": "0.2", "1.3": "0.3", "1.4": "0.4" },
    bids: { "0.6": "0.6", "0.7": "0.7", "0.8": "0.8", "0.9": "0.9" },
    askIds: ["1.1", "1.2", "1.3", "1.4"],
    bidIds: ["0.6", "0.7", "0.8", "0.9"],
  };

  expect(expected).toEqual(orderBook);
});

test("should update OrderBook correctly", () => {
  // Given
  const mockOrderBook: OrderBook = {
    asks: { "1.1": "0.1", "1.2": "0.2", "1.3": "0.3", "1.4": "0.4" },
    bids: { "0.6": "0.6", "0.7": "0.7", "0.8": "0.8", "0.9": "0.9" },
    askIds: ["1.1", "1.2", "1.3", "1.4"],
    bidIds: ["0.6", "0.7", "0.8", "0.9"],
  };

  const mockUpdate: L2Update = {
    type: "l2update",
    product_id: "BTC-USD",
    changes: [
      ["sell", "1.1", "0.0000"],
      ["buy", "0.7", "0.0000"],
      ["sell", "1.3", "0.33"],
      ["buy", "0.6", "0.66"],
    ],
  };

  const orderBook = updateOrderBook(mockUpdate, mockOrderBook);

  const expected: OrderBook = {
    asks: { "1.2": "0.2", "1.3": "0.33", "1.4": "0.4" },
    bids: { "0.6": "0.66", "0.8": "0.8", "0.9": "0.9" },
    askIds: ["1.2", "1.3", "1.4"],
    bidIds: ["0.6", "0.8", "0.9"],
  };

  expect(expected).toEqual(orderBook);
});
