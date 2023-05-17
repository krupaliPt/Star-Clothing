import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : () => {}
})

export const CartProvider = ({children}) =>{

    const [isCartOpen, setIsCartOpen] = useState(false);
    const values ={isCartOpen,setIsCartOpen};

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>;

}