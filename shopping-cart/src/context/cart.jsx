import { createContext, useReducer} from "react";

export const CartContext = createContext();

// para guardar del localStorage lo que hay en el carrito
const initialState = JSON.parse(window.localStorage.getItem('cart')) || [];

// update localStorage con el state para el carrito
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}
// todo esto va antes de cada return, se debe actualizar con el nuevo estado

const reducer = (state, action) => {

  const { type: actionType, payload: actionPayload } = action;
  
  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload;
      //checar si el producto existía, ahora ya no lo buscamos en cart sino en state
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        updateLocalStorage(newState);
        return newState;
      }

      // en lugar de un return hacemos un newState
      const newState = [
        ...state,
        {
          ...actionPayload,// product
          quantity: 1
        }
      ]

      updateLocalStorage(newState);// asegurarnos que actualizamos con el nuevo estado
      return newState;
    }
    
    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload;
      const newState = state.filter(item => item.id != id);
      updateLocalStorage(newState);
      return newState;
    }

    case 'CLEAR_CART': {
      const newState = [];
      updateLocalStorage(newState);
      return newState;// hacemos un reset
    }
  }

  return state
}

export function CartProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  
  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
