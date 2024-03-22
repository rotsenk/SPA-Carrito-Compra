import { useContext } from "react";
import { CartContext } from "../context/cart.jsx";

//creamos nuestro Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);//para utilizar el context

  //una buena práctica, que se suele hacer en los custom hooks que leen un contexto
  //es saber si el contexto que ha leído es indefinido
  //lo que quiere decir es que estamos utilizando este custon hook en una parte que no está 
  //envuelta en un provider
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
