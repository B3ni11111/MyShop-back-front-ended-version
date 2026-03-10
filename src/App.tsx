import { useMemo, useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import "./assets/fonts/fonts.css";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import theme from "./components/Theme";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { AppContextType } from "./types/appContext";
import type { oneItemInterface } from "./types/item";
import type { CartItem } from "./types/cartItem";
import { SortOption } from "./types/appContext";
import { itemsData as staticItemsData } from "./itemsData";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

const flattenedItems: oneItemInterface[] = staticItemsData.flatMap((entry) =>
  entry.category.subCategory.flatMap((sub) => sub.items)
);

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [fav, setFav] = useState<oneItemInterface[]>(() => {
    const saved = localStorage.getItem("fav");
    return saved ? JSON.parse(saved) : [];
  });
  const [sort, setSort] = useState<SortOption>("recommended");

  const addToCart = (item: oneItemInterface) => {
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
  const toggleFav = (item: oneItemInterface) => {
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
      return flattenedItems;
    }

    if (sort === "lowToHigh") {
      return [...flattenedItems].sort((a, b) => a.price - b.price);
    }

    if (sort === "highToLow") {
      return [...flattenedItems].sort((a, b) => b.price - a.price);
    }

    return flattenedItems;
  }, [sort]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  const appData: AppContextType = {
    itemsData: sortedItems,
    sort,
    setSort,
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
