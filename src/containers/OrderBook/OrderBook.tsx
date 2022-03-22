import { FC } from "react";
import { TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from "@mui/material";
import { Amount } from "../../components/Amount";
import { useOrderBook } from "../../hooks/useOrderBook";

export interface OrderBookProps {
  level: number;
}

export const OrderBook: FC<OrderBookProps> = ({ level, children }) => {
  const orderBook = useOrderBook();

  const AskBook = [...Array(level).keys()].map((_, i) => {
    if (!orderBook) {
      return getTableRowSeleton(i);
    }

    const { askIds, asks } = orderBook;
    const price = askIds[level - i - 1];
    const size = asks[price];
    return (
      <TableRow key={price}>
        <TableCell sx={{ color: "ask.main" }}>{price}</TableCell>
        <TableCell>
          <Amount value={size} />
        </TableCell>
      </TableRow>
    );
  });

  const BidBook = [...Array(level).keys()].map((_, i) => {
    if (!orderBook) {
      return getTableRowSeleton(i);
    }

    const { bidIds, bids } = orderBook;
    const price = bidIds[bidIds.length - i - 1];
    const size = bids[bidIds[bidIds.length - i - 1]];
    return (
      <TableRow key={price}>
        <TableCell sx={{ color: "bid.main" }}>{price}</TableCell>
        <TableCell>
          <Amount value={size} />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper} style={{ width: 200 }}>
      <Table style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {AskBook}
          <TableRow>
            <TableCell sx={{ textAlign: "center" }} colSpan={2}>
              {children}
            </TableCell>
          </TableRow>
          {BidBook}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function getTableRowSeleton(i: number) {
  return (
    <TableRow key={i}>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
  );
}
