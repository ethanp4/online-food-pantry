import { createContext, useState } from "react";
import { useEffect } from "react";

//for usage, add the following to your jsx file
//const { cart, setCart } = useContext(CartContext)

const CartContext = createContext();

const CartProvider = ({children}) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  return (
    <CartContext.Provider value={{cart, setCart}}>
      {children}
    </CartContext.Provider> 
  )
}

export {CartContext, CartProvider}