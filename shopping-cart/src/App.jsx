import { useContext, useState } from "react";
import { Products } from "./components/Products";
import { products as initialProducts } from "./mocks/products.json";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { IS_DEVELOPMENT } from './config.js';
import { FiltersContext } from "./context/filters.jsx";

//filters.jsx nos devuelve el filters y setFilters
function useFilters(){
  //destructuring
  const { filters, setFilters } = useContext(FiltersContext);

  const filterProducts = (products) => {
    return products.filter(product => {
      return(
        product.price >= filters.minPrice && (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  return { filters, filterProducts, setFilters }

}


function App() {
  const [products] = useState(initialProducts);

  const { filters, filterProducts, setFilters } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <>
      <Header changeFilters={ setFilters } />
      <Products products={ filteredProducts } />
      {IS_DEVELOPMENT && <Footer filters={ filters } />}
    </>
  );
}

export default App;
