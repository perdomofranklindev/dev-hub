'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { devHubTheme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
  themeColor: string;
  fontSize: number;
  fontFamily: string;
  setThemeColor: (color: string) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (font: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const DevHubThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeColor, setThemeColor] = useState('#3F51B5');
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Inter');

  // Create a modified theme based on user preferences
  const theme = useMemo(() => {
    const baseTheme = devHubTheme;

    // Create a new theme with the user's preferences
    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
      },
      typography: {
        fontFamily: fontFamily,
        fontSize: fontSize,
      },
    });
  }, [themeColor, fontSize, fontFamily]);

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        fontSize,
        fontFamily,
        setThemeColor,
        setFontSize,
        setFontFamily,
      }}
    >
      <ThemeProvider theme={theme} defaultMode="dark">
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeConfiguration = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
