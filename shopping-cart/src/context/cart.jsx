import { createContext, useState } from "react";

//1. Crear el contexto
export const CartContext = createContext();

//2. Crear el proveedor
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      return setCart(newCart);
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  //para remover del carrito
  //con el setter y el previous state
  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id != product.id));
    //filtramos los productos que tengan un id diferente
  }//luego lo pasamos en value del proveedor

  const clearCart = () => {
    setCart([]); //para limpiar el cart ponemos el array vacío
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
