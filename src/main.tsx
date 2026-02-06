import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ShopItems from "./components/ShopItems";
import ItemPage from "./components/ItemPage";
import Cart from "./components/Cart";
import About from "./components/About";
import Fav from "./components/Fav";
import Home from "./components/Home";
import SubCat from "./components/SubCat";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/:mainCat", element: <SubCat /> },
      { path: "/:mainCat/:subCat", element: <ShopItems /> },
      { path: "item-page/:id", element: <ItemPage /> },
      { path: "cart", element: <Cart /> },
      { path: "about", element: <About /> },
      { path: "fav", element: <Fav /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
