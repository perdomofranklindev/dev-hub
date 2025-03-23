'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { devHubTheme } from './theme';
import { Roboto, Inter, Poppins, Montserrat } from 'next/font/google';
import CssBaseline from '@mui/material/CssBaseline';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

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
  const [fontFamily, setFontFamily] = useState('Roboto');

  const handleFontFamilyChange = (font: string) => {
    if (font === 'Inter') {
      return inter;
    } else if (font === 'Poppins') {
      return poppins;
    } else if (font === 'Montserrat') {
      return montserrat;
    }

    return roboto;
  };

  // Create a modified theme based on user preferences
  const theme = useMemo(() => {
    const baseTheme = devHubTheme;
    const fontFamilyStyle = handleFontFamilyChange(fontFamily);

    // Create a new theme with the user's preferences
    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
      },
      typography: {
        fontFamily: fontFamilyStyle.style.fontFamily,
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
