import {createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import type { contextProduct } from '@/types/interfaces'

interface StateContextProps {
  children: React.ReactNode
}

interface AppContext {
  showCart: boolean
  //setShowCart: React.Dispatch<React.SetStateAction<boolean>>
  cartItems: contextProduct[]
  //setCartItems: React.Dispatch<React.SetStateAction<string[] | undefined>>
  totalPrice: number
  //setTotalPrice: React.Dispatch<React.SetStateAction<number | undefined>>
  totalQuantities: number
  //setTotalQuantities: React.Dispatch<React.SetStateAction<number[] | undefined>>
  qty: number
  //setQty: React.Dispatch<React.SetStateAction<number | undefined>>
  incQty: () => void;
  decQty: () => void;
}

const Context = createContext<AppContext | undefined>(undefined);

export const StateContext = ({ children }: StateContextProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<contextProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product: contextProduct, quantity: number) => {
    const checkProductInCart = cartItems.find((item: contextProduct) => item._id === product._id);

    if (checkProductInCart) {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
    }
  }
  
    const incQty = () => {
      setQty((prevQty) => prevQty + 1);
    }
  
    const decQty = () => {
      setQty((prevQty) => {
        if (prevQty - 1 < 1) return 1;
        return prevQty - 1;
      });
    }
  
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)