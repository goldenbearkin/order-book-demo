export interface Subscribe {
  type: "subscribe";
  product_ids: string[];
  channels: string[];
}

export interface UnSubscribe {
  type: "unsubscribe";
  product_ids: string[];
  channels: string[];
}

export type SubscriptionStream = Subscribe | UnSubscribe;
