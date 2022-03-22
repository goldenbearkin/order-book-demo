import { ThemeProvider, styled } from "@mui/material";
import { theme } from "./theme";
import { WebSocketProvider } from "./contexts/WebSocketProvider";
import { ProductSelect } from "./containers/ProductSelect";
import { OrderBook } from "./containers/OrderBook";
import { MarketPrice } from "./containers/MarketPrice";

export default function App() {
  return (
    <WebSocketProvider>
      <ThemeProvider theme={theme}>
        <Center>
          <ProductSelect />
          <br />
          <OrderBook level={10}>
            <MarketPrice />
          </OrderBook>
        </Center>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

const Center = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
});
