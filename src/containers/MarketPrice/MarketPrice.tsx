import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { Skeleton, styled } from "@mui/material";
import { useTicket } from "../../hooks/useTicker";

export const MarketPrice = () => {
  const ticker = useTicket();

  if (!ticker) {
    return (
      <Wrapper>
        <Skeleton width="50%" />
      </Wrapper>
    );
  }

  const { price, comparison } = ticker;

  switch (comparison) {
    case "up":
      return (
        <Wrapper sx={{ color: "ask.main" }}>
          {price} <ArrowDropDown />
        </Wrapper>
      );

    case "down":
      return (
        <Wrapper sx={{ color: "bid.main" }}>
          {price} <ArrowDropUp />
        </Wrapper>
      );

    case "level":
      return <Wrapper>{price} --</Wrapper>;
  }
};

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 4,
  height: "2rem",
});
