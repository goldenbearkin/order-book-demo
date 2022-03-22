import { useSubscription } from "../../hooks/useSubscription";

export const ProductSelect = () => {
  const [productId, setProductId] = useSubscription("BTC-USDC");

  return (
    <select value={productId} onChange={(e) => setProductId(e.target.value)}>
      <option value="BTC-USDC">BTC-USDC</option>
      <option value="ETH-USDC">ETH-USDC</option>
    </select>
  );
};
