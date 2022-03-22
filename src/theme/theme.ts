import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    ask: Palette["primary"];
    bid: Palette["primary"];
  }
  interface PaletteOptions {
    ask: PaletteOptions["primary"];
    bid: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    mode: "dark",
    ask: {
      main: "rgb(223, 66, 73)",
    },
    bid: {
      main: "rgb(21, 158, 73)",
    },
  },
  typography: {
    fontSize: 12,
  },

  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: "18px",
        },
        head: {
          height: "auto",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "0px 8px",
          textAlign: "right",
        },
        body: {
          border: 0,
        },
      },
    },
  },
});
