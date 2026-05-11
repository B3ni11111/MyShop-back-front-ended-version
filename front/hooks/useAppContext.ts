import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import type { AppContextType } from "../types";

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
