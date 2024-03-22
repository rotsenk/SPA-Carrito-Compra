import { createContext, useState } from 'react'

//1. Crear el contexto
export const CartContext = createContext()

//2. Crear el proveedor
export function CartProvider({ children }){
    const [cart, setCart] = useState([]);

    //si queremos añadir e incrementar
    const addToCart = product => {
        //checar si el producto ya se encuentra en el carrito
        const productInCartIndex = cart.findIndex( item => item.id === product.id);

        //verificar si se encontró, con el indice
        if (productInCartIndex >= 0) {
            //lo que haremos entonces es hacer un nuevo carrito utilizando structure clone
            const newCart = structuredClone(cart);//hace copias profundas de los arrays y de los objetos
            //ahora que ya tenemos un carrito nuevo usamos el indice que se recuperó e incrementar la cantidad
            //esto no es parte del estado, sino que la copia estamos utilizando
            newCart[productInCartIndex].quantity += 1;
            return setCart(newCart);
        }

        //si el producto NO está en el carrito
        //como no esta en el carrito, la cantidad la inicializamos en 1
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))

    }

    const clearCart = () => {
        setCart([]);//para limpiar el cart ponemos el array vacío
    }

    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart
        }} 
        >
            { children }
        </CartContext.Provider>
    )
}