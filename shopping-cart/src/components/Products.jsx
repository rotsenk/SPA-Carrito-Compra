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
