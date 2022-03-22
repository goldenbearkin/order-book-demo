import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../../contexts/WebSocketProvider";

export function useSubscription(defaultProductId: string) {
  const subject = useContext(WebSocketContext);

  const [productId, setProductId] = useState(defaultProductId);

  useEffect(() => {
    subject.next({ type: "subscribe", product_ids: [productId], channels: ["level2", "heartbeat", "ticker"] });
    return () =>
      subject.next({ type: "unsubscribe", product_ids: [productId], channels: ["level2", "heartbeat", "ticker"] });
  }, [productId, subject]);

  return [productId, setProductId] as const;
}
