# Mostrar visualmente el producto
En esta sección, mostraremos el producto si está añadido al carrito.

Nos dirigimos a `Products.jsx` y realizamos las modificaciones para mostrar visualmente el carrito en el navegador.

```jsx
import "./Products.css";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart.jsx";

export function Products({ products }) {
  //agregar cart
  const { addToCart, cart } = useCart();

  //método para checar si el producto está en el cart
  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
    //si el carrito tiene un item con el id del producto que vamos a checar
  };

  return (
    <main className="products">
      <ul>
        {products.slice(0, 12).map((product) => {

          const isProductInCart = checkProductInCart(product); //checamos el producto en cart
          //esto puede ser true o false
          //modificamos en el button donde se renderiza el AddToCartIcon y cambiamos

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>
                  {product.title} - ${product.price}{" "}
                </strong>
              </div>
              <div>
                <button onClick={() => addToCart(product)}>
                  {
                    //modificando
                    isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />
                    //con esto detecta si está o no en el carrito y cambia según la condición
                  }
                </button>
              </div>
            </li>
          );//cierre del nuevo return implementado
        })}
      </ul>
    </main>
  );
}
```
Ahora ya se muestra el cambio que tiene el carrito al tener agregado un producto, ya que ahora detecta si ya está en el carrito.

## Quitar 
Tenemos que filtar, para poder hacer que se quite o sea remove
- Nos dirigimos a `cart.jsx` y hacemos las modificaciones para remover
```jsx
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
```

Ahora en el `Product.jsx`

Se modificaron los estilos del botón de agregar y el onClick, asimismo, se agregó la variable de estado para remover
```jsx
import "./Products.css";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart.jsx";

export function Products({ products }) {
  //agregar removeFromCart, ahora ya vamos a poder añadir y quitar, en el onClick de button para add
  const { addToCart, cart, removeFromCart } = useCart();

  //método para checar si el producto está en el cart
  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <main className="products">
      <ul>
        {products.slice(0, 12).map((product) => {

          const isProductInCart = checkProductInCart(product);//esto puede ser true o false

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>
                  {product.title} - ${product.price}{" "}
                </strong>
              </div>
              <div>
                <button style={{ backgroundColor: isProductInCart ? 'red' : 'green' }} 
                onClick={() => { isProductInCart ? removeFromCart(product) : addToCart(product) }}>
                  {
                    isProductInCart 
                    ? <RemoveFromCartIcon /> 
                    : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          );//cierre del nuevo return implementado
        })}
      </ul>
    </main>
  );
}
```

## Footer
Ahora modificaremos el footer...
Porque ya tenemos lo que queremos visualmente.
```jsx
// import { useCart } from '../hooks/useCart';
// import { useFilters } from '../hooks/useFilters';
import './Footer.css'

export function Footer () {
  // const { filters } = useFilters();
  // const { cart } = useCart();
  return (
    <footer className='footer'>
      <h4><span>Nestor Rivas</span></h4>
      <h5>Shopping Cart con useContext & useReducer</h5>
    </footer>
  )
}
```

Ahorita no funciona el agregar al carrito, porque no lo estamos programando. El carrito todavía no lo tenemos para mostrar. Pero en este momento lo haremos.

## Mostrar en carrito
Nos dirigimos hacia `Cart.jsx` este es el "Carrito"

```jsx
import './Cart.css'
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from '../hooks/useCart';

export function Cart() {
  const cartCheckboxId = useId();
  //tnemos que traernos el carrito, y arreglar el carrito todo lo que tenemos
  //clearCart es bastante sencillo que si le damos clic al botón, desaparecen los carritos seleccionados
  const { cart, clearCart } = useCart();//pasamos onChange en button el clearCartIcon

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

        <button style={{ background: '#E36414' }} onClick={ clearCart } >
            <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}

```

Esto ya funciona, sin embargo aún falta programar la sincronización de la selección del producto para que aparezca en el carrito.
Tenemos que iterar.
- Separamos el `<li>` en una función.
```jsx
import "./Cart.css";
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from "../hooks/useCart";

//separamos el li del aside ul
function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img
        src={ thumbnail }
        alt={ title }
      />
      <div>
        <strong>{ title }</strong> - ${ price }
      </div>

      <footer>
        <small> Qty: { quantity } </small>
        <button onClick={ addToCart } >+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();

  //traemos la variable de estado que se llame addToCart
  const { cart, clearCart, addToCart } = useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          {
            cart.map( product => (
              <CartItem 
                key={ product.id } 
                addToCart={ () => addToCart(product) }  
                { ...product } 
              />
            ))
          }
        </ul>

        <button style={{ background: "#E36414" }} onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
```

Aquí lo que hacemos es pasar una función como props, para añadir específicamente ese producto, porque no hace falta que addToCart como global pase por todo, sólo lo hace el padre y ya está.

En la siguiente sección veremos el `useReducer`