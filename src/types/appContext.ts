import type { oneItemInterface } from "./item";
import type { CartItem } from "./cartItem";

export type ThemeMode = "light" | "dark";

export interface ThemePreference {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export interface AppContextType {
  fav: oneItemInterface[];
  mode: ThemeMode;
  cart: CartItem[];
  sort: SortOption;
  itemsData: oneItemInterface[];
  resetCart: () => void;
  toggleTheme: () => void;
  getTotalItems: () => number;
  addToCart: (item: oneItemInterface) => void;
  toggleFav: (item: oneItemInterface) => void;
  setSort: (sort: SortOption) => void;
  removeFromCart: (itemId: number | string) => void;
  updateQuantity: (id: number | string, newQ: number) => void;
}

export type SortOption = "default" | "lowToHigh" | "highToLow" | "recommended";
