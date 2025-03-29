'use client';

import { createContext, useContext, useMemo, useState, useEffect } from 'react';
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

const STORAGE_KEY = 'devhub-theme-preferences';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const DevHubThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state with default values
  const [themeColor, setThemeColorState] = useState('#3F51B5');
  const [fontSize, setFontSizeState] = useState(14);
  const [fontFamily, setFontFamilyState] = useState('Roboto');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved preferences from localStorage on component mount
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      try {
        const savedPreferences = localStorage.getItem(STORAGE_KEY);

        if (savedPreferences) {
          const {
            themeColor: savedColor,
            fontSize: savedSize,
            fontFamily: savedFont,
          } = JSON.parse(savedPreferences);

          if (savedColor) setThemeColorState(savedColor);
          if (savedSize) setFontSizeState(savedSize);
          if (savedFont) setFontFamilyState(savedFont);
        }
      } catch (error) {
        console.error('Failed to load theme preferences from localStorage:', error);
      } finally {
        setIsInitialized(true);
      }
    }
  }, []);

  // Wrapper functions to update state and localStorage
  const setThemeColor = (color: string) => {
    setThemeColorState(color);
    savePreferences({ themeColor: color, fontSize, fontFamily });
  };

  const setFontSize = (size: number) => {
    setFontSizeState(size);
    savePreferences({ themeColor, fontSize: size, fontFamily });
  };

  const setFontFamily = (font: string) => {
    setFontFamilyState(font);
    savePreferences({ themeColor, fontSize, fontFamily: font });
  };

  // Helper function to save preferences to localStorage
  const savePreferences = (preferences: {
    themeColor: string;
    fontSize: number;
    fontFamily: string;
  }) => {
    if (typeof window !== 'undefined' && isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      } catch (error) {
        console.error('Failed to save theme preferences to localStorage:', error);
      }
    }
  };

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
  }, [fontSize, fontFamily]);

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
