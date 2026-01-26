import { useMemo } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

import laptopImg from "./assets/imgs/laptop.jpeg";
import smartphoneImg from "./assets/imgs/smartphone.jpeg";
import headphonesImg from "./assets/imgs/headphones.jpeg";
import iphoneImg from "./assets/imgs/b_1.jpg";
import hoodieImg from "./assets/imgs/b_2.jpg";
import hoodie2Img from "./assets/imgs/b_3.jpg";
import hoodie3Img from "./assets/imgs/b_4.jpg";
import macbookImg from "./assets/imgs/b_5.jpg";
import coffieImg from "./assets/imgs/b_6.jpg";
import pspImg from "./assets/imgs/b_7.jpg";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { getTheme } from "./components/Theme";
import useThemePreference from "./hooks/useThemePreference";
import { itemsData } from "./itemsData";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";



export const AppContext = createContext()

function App() {

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
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

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    console.log(cart);
  };

  const updateQuantity = (id, newQ) => {
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

  const appData = { itemsData, mode, toggleTheme, cart, addToCart, removeFromCart, updateQuantity, getTotalItems }

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
