import { createTheme, Theme } from "@mui/material";

// Module augmentation for custom palette colors
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      dark: string;
      veryDark: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      dark: string;
      veryDark: string;
    };
  }
}

export type ThemeMode = "light" | "dark";

export const getTheme = (mode: ThemeMode): Theme =>
  createTheme({
    typography: {
      fontFamily: '"Open Sans", sans-serif',
    },
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: "#c6ac8f",
            },
            secondary: {
              main: "#eae0d5",
            },
            background: {
              default: "#5e503f",
              paper: "#5e503f",
            },
            text: {
              primary: "#e0e1dd",
              secondary: "#eae0d5",
            },
            custom: {
              dark: "#1b263b",
              veryDark: "#0d1b2a",
            },
          }
        : {
            primary: {
              main: "#415aa7",
            },
            secondary: {
              main: "#778da9",
            },
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#1b263b",
              secondary: "#415a77",
            },
            custom: {
              dark: "#778da9",
              veryDark: "#415a77",
            },
          }),
    },
  });

const theme = getTheme("dark");
export default theme;
