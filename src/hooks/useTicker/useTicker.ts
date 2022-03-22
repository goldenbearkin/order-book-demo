import { useContext, useEffect, useState } from "react";
import { filter } from "rxjs/operators";
import { WebSocketContext } from "../../contexts/WebSocketProvider";
import { TickerStream, Ticker } from "./model";

export function useTicket() {
  const subject = useContext(WebSocketContext);

  const [ticker, setTicker] = useState<Ticker | undefined>(undefined);

  useEffect(() => {
    if (subject === undefined) {
      throw new Error("useTicket must be within WebSocketProvider");
    }

    const sub = subject.pipe(filter((data): data is TickerStream => data.type === "ticker")).subscribe((data) => {
      const { price, product_id: productId } = data;

      setTicker((prev) => {
        if (prev === undefined || prev.productId !== productId) {
          return { productId, price, comparison: "level" };
        } else if (prev.price > price) {
          return { productId, price, comparison: "up" };
        } else if (prev.price < price) {
          return { productId, price, comparison: "down" };
        } else {
          return { productId, price, comparison: "level" };
        }
      });
    });

    return () => sub.unsubscribe();
  }, [subject]);

  return ticker;
}
