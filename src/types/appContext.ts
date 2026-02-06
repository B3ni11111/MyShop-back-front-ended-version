import type { Item } from "./item";
import type { CartItem } from "./cartItem";


export type ThemeMode = "light" | "dark";

export interface ThemePreference {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export interface AppContextType {
  fav: Item[];
  mode: ThemeMode;
  cart: CartItem[];
  sort: SortOption;
  itemsData: Item[];
  resetCart: () => void
  toggleTheme: () => void;
  getTotalItems: () => number;
  addToCart: (item: Item) => void;
  toggleFav: (item: Item) => void;
  setSort: (sort: SortOption) => void;
  removeFromCart: (itemId: number | string) => void;
  updateQuantity: (id: number | string, newQ: number) => void;
}


export type SortOption = "default" | "lowToHigh" | "highToLow" | "recommended";
