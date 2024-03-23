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
