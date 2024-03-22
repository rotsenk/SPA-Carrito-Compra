# Creación de un carrito
En esta sección, llegamos a la creación de un carrito desde cero.
A base de iniciar el ejemplo, lo haremos así, para poder darle estilos:
```jsx
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";

export function Cart() {
  const cartCheckboxId = useId();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className='cart'>
        <ul>
          <li>
            <img 
                src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg" 
                alt="iPhone" 
            />
            <div>
                <strong>iPhone</strong> - $1499
            </div>

            <footer>
                <small>
                    Qty: 1
                </small>
                <button>+</button>
            </footer>
          </li>
        </ul>

        <button>
            <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
```
Luego, en `App.jsx` vamos a renderizar el carrito
```jsx
return (
    <>
      <Header />
      <Cart />
      <Products products={ filteredProducts } />
      {IS_DEVELOPMENT && <Footer />}
    </>
  );
```

## Estilar el `Cart.jsx`
- Pasar la plantilla de descarga de estilos css para `Cart.css`

Visualmente, ya tendríamos el carrito!!!

# Contexto
Ahora, tenemos que crear el contexto.
Dentro de la carpeta `/context` vamos a crear un nuevo archivo, con el nombre de `cart.jsx`lo vamos a crear para tener un estado global, para que el carrito aparezca y cada que demos clic en los botones se sincronice automáticamente.

versión super sencilla de nuestro provider con el estado

```jsx
import { createContext, useState } from 'react'

//1. Crear el contexto
export const CartContext = createContext()

//2. Crear el proveedor
export function CartProvider({ children }){
    const [cart, setCart] = useState([]);// con un array para manejarlo más fácil

    const addToCart = product => {}//por ahora no tiene nada

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
```

Ahora, vamos a hacer el `addToCart` que por el momento no tiene nada.
Como en el carrito le he puesto un Quantity y un más, vamos a hacer algo de forma sencilla de añadir el producto al carrito.

Haremos una forma agregando al carrito con structured clone, y luego otra forma
```jsx
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
```

## Crear un hook
Ahora que tenemos el Contexto, vamos a crear un hook para poder leer el contexto
- En la carpeta `/hooks` crearemos un archivo llamado `useCart.jsx` para leer el contexto
```jsx
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
```

Ahora, nos vamos al `App.jsx` a envolver en el proveedor, para que mi app pueda acceder a los estados globales

No siempre hace falta envolver toda la aplicación, a veces sólo necesitamos que una parte sea envuelta y tenga acceso a ese provider
```jsx
import { useState } from "react";
import { Products } from "./components/Products";
import { products as initialProducts } from "./mocks/products.json";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { IS_DEVELOPMENT } from './config.js';
import { useFilters } from "./hooks/useFilters.jsx";
import { Cart } from "./components/Cart.jsx";
import { CartProvider } from "./context/cart.jsx";

function App() {
  const [products] = useState(initialProducts);

  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={ filteredProducts } />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  );
}

export default App;

```
A medida adquirimos experiencia, utilizaremos los provider sólo en aquellos scope que son necesario, en los que tienen sentido, cuanto más pequeño el scope mejor

Ahora nos dirigimos a `Products.jsx` vemos que los productos tienen el botón de añadir al carrito, ya podríamos utilizarlo, usar el `useCart()`

```jsx
import "./Products.css";
import { AddToCartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart.jsx";

export function Products({ products }) {
  //Para utilizar el botón de añadir
  const { addToCart } = useCart();//pasamos este al button

  return (
    <main className="products">
      <ul>
        {products.slice(0, 12).map((product) => (
          <li key={product.id}>
            <img 
                src={product.thumbnail} 
                alt={product.title} 
            />
            <div>
                <strong>{ product.title } - ${ product.price } </strong>
            </div>
            <div>
                <button onClick={ () => addToCart(product) }>
                    <AddToCartIcon />
                </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
``` 

Nos dirigmos hacia el `Footer.jsx`, y vamos a importar el contexto del cart o sea `useCart` y dejamos el código así:

```jsx
import { useCart } from '../hooks/useCart';
import { useFilters } from '../hooks/useFilters';
import './Footer.css'

//en lugar de pasarselo por props
export function Footer () {
  const { filters } = useFilters();
  const { cart } = useCart();//ahora pasamos cart en el JSON.stringify

  return (
    <footer className='footer'>
      {
        JSON.stringify(filters, null, 2)
      }

      {
        JSON.stringify(cart, null, 2)
      }

      {/* <h4><span>Nestor Rivas</span></h4>
      <h5>Shopping Cart con useContext & useReducer</h5> */}
    </footer>
  )
}

```
Por ahora, esto no añade nada, porque no lo tenemos en la parte visual. Sólo en el footer, pero ya estoy verificando que es funcional y añade productos si ya están, aumenta la cantidad, pero si no está el producto lo añade.