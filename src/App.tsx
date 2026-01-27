import { useMemo } from "react";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { getTheme } from "./components/Theme";
import useThemePreference from "./hooks/useThemePreference";
import { itemsData } from "./itemsData";
import { createContext, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { AppContextType } from "./types/appContext";
import type { Item } from "./types/item";
import type { CartItem } from "./types/cartItem";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}


function App() {

  const [cart, setCart] = useState<CartItem[]>([]);
  const [fav, setFav] = useState<Item[]>([]);

  const addToCart = (item: Item) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((cartItem) => cartItem.id === item.id);
      if (isExist) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    console.log(cart);
  };
  const toggleFav = (item: Item) => {
    setFav((prevArr) => {
      const isExist = prevArr.find((favItem) => favItem.id === item.id);
      if (isExist) {
        return prevArr.filter((favItem) => favItem.id !== item.id);
      }
      return [...prevArr, item];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    console.log(cart);
  };

  const updateQuantity = (id: number, newQ: number) => {
    if (newQ <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQ } : item
      )
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };



  const { mode, toggleTheme } = useThemePreference();
  const theme = useMemo(() => getTheme(mode), [mode]);

  const appData: AppContextType = { itemsData, fav, toggleFav, mode, toggleTheme, cart, addToCart, removeFromCart, updateQuantity, getTotalItems };

  return (
    <>
      <AppContext.Provider value={appData}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header cartCount={getTotalItems()} />

          <Outlet />

          <Footer />
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
