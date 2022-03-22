import { FC, useMemo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { styled } from "@mui/material";

interface AmountProps {
  value: string;
}

export const Amount: FC<AmountProps> = ({ value }) => {
  const ref = useRef(null);
  const previousValue = useRef(value);

  const [leading, trailing] = useMemo(() => {
    const float = parseFloat(value);
    const leading = Number.isInteger(float) ? float.toString() + "." : float.toString();
    const trailing = "".padEnd(value.length - leading.length, "0");
    return [leading, trailing];
  }, [value]);

  return (
    <CSSTransition
      nodeRef={ref}
      in={previousValue.current !== value}
      timeout={600}
      classNames={`amount-${previousValue.current > value ? "ask" : "bid"}`}
      onEntered={() => (previousValue.current = value)}
    >
      <div ref={ref}>
        <Leading>{leading}</Leading>
        <Trailing>{trailing}</Trailing>
      </div>
    </CSSTransition>
  );
};

const Leading = styled("span")(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Trailing = styled("span")(({ theme }) => ({
  color: theme.palette.text.disabled,
  opacity: 0.5,
}));
