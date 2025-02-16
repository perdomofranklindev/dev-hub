import { createTheme } from "@mui/material/styles";

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
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

export const devHubTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    primary: {
      main: "#3F51B5", // --primary-100
    },
    secondary: {
      main: "#333333", // --accent-200
    },
    warning: {
      main: "#FF9800", // Fallback: Orange (You can adjust this)
    },
    info: {
      main: "#1276E8", // --accent-100 (Blue)
    },
    error: {
      main: "#D6211D", // Fallback: Red (You can adjust this)
    },
    success: {
      main: "#008a67", // Fallback: Green (You can adjust this)
    },
    text: {
      primary: "#333333", // --text-100
      secondary: "#5c5c5c", // --text-200
    },
    background: {
      default: "#FFFFFF", // --bg-100
      paper: "#f5f5f5", // --bg-200
    },
    grey: {
      300: "#cccccc", // --bg-300
    },
  },
});
