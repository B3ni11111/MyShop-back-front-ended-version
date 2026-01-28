import type { Item } from "./item";
import type { CartItem } from "./cartItem";
import type { catItem } from "./catItem";


export type ThemeMode = "light" | "dark";

export interface ThemePreference {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export interface AppContextType {
  itemsData: Item[];
  mode: ThemeMode;

  toggleTheme: () => void;
  cart: CartItem[];
  fav: Item[];
  addToCart: (item: Item) => void;
  toggleFav: (item: Item) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (id: number, newQ: number) => void;
  getTotalItems: () => number;
}
