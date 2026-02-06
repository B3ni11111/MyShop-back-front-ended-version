import { useMemo } from "react";
import "./App.css";
import "./assets/fonts/fonts.css";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { getTheme } from "./components/Theme";
import useThemePreference from "./hooks/useThemePreference";
import { itemsData } from "./itemsData";
import { createContext, useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { AppContextType } from "./types/appContext";
import type { Item } from "./types/item";
import type { CartItem } from "./types/cartItem";
import { SortOption } from "./types/appContext";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [fav, setFav] = useState<Item[]>(() => {
    const saved = localStorage.getItem("fav");
    return saved ? JSON.parse(saved) : [];
  });
  const [sort, setSort] = useState<SortOption>("recommended");

  const addToCart = (item: Item) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((cartItem) => cartItem.id === item.id);
      if (isExist) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    console.log(cart);
  };
  const toggleFav = (item: Item) => {
    setFav((prevArr) => {
      const isFav = prevArr.find((favItem) => favItem.id === item.id);
      if (isFav) {
        return prevArr.filter((favItem) => favItem.id !== item.id);
      }
      return [...prevArr, item];
    });
  };

  const removeFromCart = (itemId: number | string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    console.log(cart);
  };
  const resetCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: number | string, newQ: number) => {
    if (newQ <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQ } : item,
      ),
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const sortedItems = useMemo(() => {
    if (sort === "recommended") {
      return itemsData;
    }

    if (sort === "lowToHigh") {
      return [...itemsData].sort((a, b) => a.price - b.price);
    }

    if (sort === "highToLow") {
      return [...itemsData].sort((a, b) => b.price - a.price);
    }

    return itemsData;
  }, [sort]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  const { mode, toggleTheme } = useThemePreference();
  const theme = useMemo(() => getTheme(mode), [mode]);

  const appData: AppContextType = {
    itemsData: sortedItems,
    sort,
    setSort,
    mode,
    toggleTheme,
    cart,
    fav,
    addToCart,
    toggleFav,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    resetCart,
  };

  return (
    <AppContext.Provider value={appData}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header cartCount={getTotalItems()} />

          <Box component="main" sx={{ flex: 1 }}>
            <Outlet />
          </Box>

          <Footer />
        </Box>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
