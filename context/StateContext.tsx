import {createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { contextProduct, sanityProduct, toggleCartItemQuantityAction } from '@/types/interfaces'
import { INCREMENT, DECREMENT } from '../const/const'

interface StateContextPropsProvider {
  children: React.ReactNode
}

export interface AppContext {
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
  onAdd: (productToAdd: sanityProduct, quantity: number) => void;
  setShowCart: (showCart: boolean) => void;
  toggleCartItemQuantity: (id: string, action: toggleCartItemQuantityAction) => void;
  onRemove: (id: string) => void;
}

export const Context = createContext<AppContext>({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  incQty: () => {},
  decQty: () => {},
  onAdd: () => {},
  setShowCart: () => {},
  toggleCartItemQuantity: () => {},
  onRemove: () => {}
});


export const StateContextProvider = ({ children }: StateContextPropsProvider) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<contextProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState(1);

  let foundProduct: contextProduct;
  let index: number;

  const onAdd = (productToAdd: sanityProduct, quantity: number): void => {
    let product: contextProduct = { ...productToAdd, quantity: quantity}
    const checkProductInCart = cartItems.find((item: contextProduct) => item?._id === product?._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product?.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {

      let updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) { 
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          };
        } else {
          return cartProduct;
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product?.name} added to the cart`);
  }

  const onRemove = (id: string) => {
    foundProduct = cartItems.find((item) => item._id === id) as contextProduct;
    const newCartItems = cartItems.filter((item) => item._id !== id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id: string, action: toggleCartItemQuantityAction) => {
    foundProduct = cartItems.find((item) => item._id === id) as contextProduct;
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = [...cartItems];

    if (action === INCREMENT) {
      newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
      setCartItems([...newCartItems]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
    } else if (action === DECREMENT) {
      if (foundProduct?.quantity > 1) {
        newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
        setCartItems([...newCartItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities--);
      }
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
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  )
}