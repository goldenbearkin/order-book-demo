import { useContext, useEffect, useRef, useState } from "react";
import { timer } from "rxjs";
import { filter, tap, throttleTime } from "rxjs/operators";
import { WebSocketContext } from "../../contexts/WebSocketProvider";
import { Level2Stream, OrderBook } from "./model";
import { parseOrderBook, updateOrderBook } from "./utils";

const emptyOrderBook: OrderBook = { askIds: [], asks: {}, bidIds: [], bids: {} };

export function useOrderBook(throttle = 0) {
  const subject = useContext(WebSocketContext);

  const [orderBook, setOrderBook] = useState<OrderBook | undefined>(undefined);

  useEffect(() => {
    if (subject === undefined) {
      throw new Error("useOrderBook must be within WebSocketProvider");
    }
    let inMemoryOrderBook = emptyOrderBook;

    const sub = subject
      .pipe(
        filter((data): data is Level2Stream => data.type === "snapshot" || data.type === "l2update"),
        tap((data) => {
          inMemoryOrderBook = mapStreamDataToOrderBook(data, inMemoryOrderBook);
        }),
        throttleTime(throttle)
      )
      .subscribe(() => setOrderBook(inMemoryOrderBook));

    return () => sub.unsubscribe();
  }, [subject, throttle]);

  return orderBook;
}

function mapStreamDataToOrderBook(data: Level2Stream, orderbook: OrderBook) {
  switch (data.type) {
    case "l2update":
      return updateOrderBook(data, orderbook);
    case "snapshot":
      return parseOrderBook(data);
    default:
      return orderbook;
  }
}
