import {createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface StateContextProps {
  children: React.ReactNode
}

interface AppContext {
  showCart: boolean
  //setShowCart: React.Dispatch<React.SetStateAction<boolean>>
  cartItems: string[] | undefined
  //setCartItems: React.Dispatch<React.SetStateAction<string[] | undefined>>
  totalPrice: number | undefined
  //setTotalPrice: React.Dispatch<React.SetStateAction<number | undefined>>
  totalQuantities: number[] | undefined
  //setTotalQuantities: React.Dispatch<React.SetStateAction<number[] | undefined>>
  qty: number
  //setQty: React.Dispatch<React.SetStateAction<number | undefined>>
  incQty: () => void;
  decQty: () => void;
}

const Context = createContext<AppContext | undefined>(undefined);

export const StateContext = ({ children }: StateContextProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);
  
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