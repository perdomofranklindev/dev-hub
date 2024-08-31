import React from "react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { theme } from "./theme";

type ThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * @description - Theme provider for the app.
 * @param {ThemeProviderProps} props - Props.
 * @returns {JSX.Element} - Theme provider.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}): JSX.Element => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
