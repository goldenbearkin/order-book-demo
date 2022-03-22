import { Snapshot, OrderBook, L2Update, Side, Price, Size } from "./model";
import _ from "lodash";

export function parseOrderBook(snapshot: Snapshot): OrderBook {
  const { asks, bids } = snapshot;
  const askIds = asks.map(([price]) => price);
  const bidIds = bids.reverse().map(([price]) => price);

  return {
    asks: Object.fromEntries(asks),
    bids: Object.fromEntries(bids),
    askIds,
    bidIds,
  };
}

function deletePriceLevelMutably(side: Side, price: Price, orderBook: OrderBook) {
  if (side === "buy" && price in orderBook.bids) {
    delete orderBook.bids[price];
    const index = _.sortedIndexOf(orderBook.bidIds, price);
    orderBook.bidIds.splice(index, 1);
    return;
  }

  if (side === "sell" && price in orderBook.asks) {
    delete orderBook.asks[price];
    const index = _.sortedIndexOf(orderBook.askIds, price);
    orderBook.askIds.splice(index, 1);
    return;
  }
}

function upsertPriceLevelMutably(side: Side, price: Price, size: Size, orderBook: OrderBook) {
  if (side === "buy") {
    if (!(price in orderBook.bids)) {
      const index = _.sortedIndex(orderBook.bidIds, price);
      orderBook.bidIds.splice(index, 0, price);
    }
    orderBook.bids[price] = size;
  }

  if (side === "sell") {
    if (!(price in orderBook.asks)) {
      const index = _.sortedIndex(orderBook.askIds, price);
      orderBook.askIds.splice(index, 0, price);
    }
    orderBook.asks[price] = size;
  }
}

export function updateOrderBook(update: L2Update, orderBook: OrderBook): OrderBook {
  const { changes } = update;

  changes.forEach(([side, price, size]) => {
    parseFloat(size) === 0
      ? deletePriceLevelMutably(side, price, orderBook)
      : upsertPriceLevelMutably(side, price, size, orderBook);
  });

  return { ...orderBook };
}
