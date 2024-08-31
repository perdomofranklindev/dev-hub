"use client";

import { createTheme } from "@mui/material";

// Type new color added to the palette.

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

// New color recognized by the MUI components.

declare module "@mui/material/Button" {
  // eslint-disable-next-line
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

const theme = createTheme({});

export { theme };
