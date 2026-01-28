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
            main: "#415a77",
          },
          secondary: {
            main: "#778da9",
          },
          background: {
            default: "#415a77",
            paper: "#1b263b",
          },
          text: {
            primary: "#e0e1dd",
            secondary: "#778da9",
          },
          custom: {
            dark: "#1b263b",
            veryDark: "#0d1b2a",
          },
        }
        : {
          primary: {
            main: "#415a77",
          },
          secondary: {
            main: "#778da9",
          },
          background: {
            default: "#e0e1dd",
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
