import { createContext, FC } from "react";
import { webSocket } from "rxjs/webSocket";
import { Level2Stream } from "../../hooks/useOrderBook";
import { SubscriptionStream } from "../../hooks/useSubscription";
import { TickerStream } from "../../hooks/useTicker";

type StreamType = SubscriptionStream | Level2Stream | TickerStream;

const subject = webSocket<StreamType>("wss://ws-feed.exchange.coinbase.com");

subject.subscribe();

export const WebSocketContext = createContext(subject);

export const WebSocketProvider: FC = ({ children }) => {
  return <WebSocketContext.Provider value={subject}>{children}</WebSocketContext.Provider>;
};
