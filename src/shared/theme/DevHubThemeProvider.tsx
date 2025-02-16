"use client";

import { ThemeProvider } from "@mui/material/styles";
import { devHubTheme } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";

export function DevHubThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={devHubTheme} defaultMode="dark">
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
