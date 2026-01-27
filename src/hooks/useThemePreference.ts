import { useState, useEffect } from "react";
import type { ThemeMode, ThemePreference } from "../types/appContext";

const STORAGE_KEY = "theme-preference";

export default function useThemePreference(): ThemePreference {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { mode, toggleTheme };
}
