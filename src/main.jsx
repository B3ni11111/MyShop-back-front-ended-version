import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ShopItems from './components/ShopItems.jsx'
import ItemPage from './components/ItemPage.jsx'
import Cart from './components/Cart.jsx'

const router = createBrowserRouter([
  {path:'/',
  element:<App/>,
  children:[
    {index: true, element:<ShopItems/>},
    {path:'item-page/:id', element:<ItemPage/>},
    {path:'cart', element:<Cart/>}
  ]
    
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
