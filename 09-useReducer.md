# useReducer
useReducer permite manejar el estado
Si miramos nuestro provider, nos daremos cuenta que tenemos muchos seteos del estado "setCart" "setCart" "setCart", tenemos muchos setteos del estado, y se vuelve un poco complicado, están dentro de las funciones y del provider, está mezclado todo.

## Reducer
Hay algo muy interesante, se puede mezclar el contexto con los reducers, lo hacemos con `useReducer` es un hook que nos permite manejar el estado de una manera escalable porque se basa en que recibe en una función el estado actual y lo que tiene que hacer. Lo que hace es devolver un nuevo estado, y esto está totalmente separado del *Functional Component*, del *Custom Hook* y del *Provider*

## ¿Cómo empezamos?
Primero, nos dirigimos a nuestro contexto en `cart.jsx`, necesitaríamos el estado inicial, podría ser un string, un número, un array.
y continuamos modificando el código:
```jsx
import { createContext, useReducer} from "react";

export const CartContext = createContext();

//inicializar el estado
const initialState = [];//al final es lo mismo que tenemos en el useState del CartProvider

//Necesitamos un reducer, recibe el estado y la acción
//lo que hace es reducir no de hacerlo más pequeño, sino 
//es transformar el estado a partir de la acción y calcular un nuevo estado
const reducer = (state, action) => {
  //usar un switch que según la acción, realiza una cosa

  const { type: actionType, payload: actionPayload } = action;//type es el string para identificar qué acción debe hacer
  //payload le pasamos el objeto que necesitamos para actualizar el estado.
  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload;
      //checar si el producto existía, ahora ya no lo buscamos en cart sino en state
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        return newState;
      }
      // en caso que el producto no esté en el carrito
      return [
        ...state,
        {
          ...actionPayload,// product
          quantity: 1
        }
      ]
    }
    
    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload;
      return state.filter(item => item.id != id);
    }

    case 'CLEAR_CART': {
      return initialState;// hacemos un reset
    }
  }

  return state
}

export function CartProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  //dispatch es la función que se encarga de enviar las acciones al reducer
  
  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  // pasamos el state a cart
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
```

## Casos para utilizar useReducer
se recomienda utilizar useReducer, cuando tenemos muchos useState uno detrás de otro, tener tantos setters, eso muchas veces quiere decir que nuestro estado lo tenemos fragmentado cuando en realidad a través de una acción queremos actualizar partes del estado, por ejemplo cuando estamos en un input y queremos saber qué escribió el usuario.

Otra ventaja es que lo podemos separar totalmente dejándolo en una carpeta de reducers.

## localStorage
Hay algo que podemos hacer con el estado inicial...

```jsx
import { createContext, useReducer} from "react";

export const CartContext = createContext();

// MODIFICAR el ESTADO INICIAL para guardar del localStorage lo que hay en el carrito
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
```
Ya con esto nosotros podemos tener guardado los productos que escogemos, en el localStorage, podemos recargar la página y se mantienen nuestros artículos.