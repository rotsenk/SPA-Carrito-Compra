# Errores que se comenten en React

De los errores más comunes que se cometen es es el tema de tener dos fuentes de la verdad.
Por qué? porque el price que se muestra en el navegador, no es el mismo que tenemos en nuestro contexto (estado global) porque está de forma local.

```js
const handleChangePrice = (event) => {
  setMinPrice(event.target.value);
  setFilters((prevState) => ({
    ...prevState,
    minPrice: event.target.value,
  }));
};

const handleChangeCategory = (event) => {
  setFilters((prevState) => ({
    ...prevState,
    category: event.target.value,
  }));
};
```
Esto nos va a dar muchos problemas. El hecho de que no sabes de cuál te tienes que fiar, por eso en React es muy importante sólo tener una fuente de la verdad.

Ver en `Filters.jsx`
piensa cuál es el estado correcto? el que tenemos aquí: `const  [minPrice, setMinPrice] = useState(0);` el estado local, o el estado global que tenemos aquí: `const { setFilters } = useFilters();` el problema es que no sabemos de cual fiarnos. 
Entonces, en lugar de tener dos estados, deberíamos tener uno solo.

## El problema...
Ver en `filters.jsx`
Imagínate que en el contexto, que minPrice empieza por 500...
```jsx
const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 500
  })
```

Pero, visualmente me los pinta en cero, lo que ocurre es que nuestra UI no es fiable, porque estamos viendo una cosa y está pasando otra internamente.

## La solución...
Entonces, cómo evitamos este problema? pues en este caso, en `Filters.jsx` nos vamos a tener que fiar obviamente de los filtros globales. 

```jsx
import { useId } from 'react';
import './Filters.css';
import { useFilters } from '../hooks/useFilters';

export function Filters () {
    //nos vamos a fiar de los filtros globales.
    const { filters, setFilters } = useFilters();

    //const  [minPrice, setMinPrice] = useState(0); E L I M I N A R
 
    const minPriceFilterId = useId();
    const categoryFilterId = useId();
    
    const handleChangePrice = (event) => {
        // E L I M I N A R
        //setMinPrice(event.target.value); //cambiamos en el <span>${ filters.minPrice }</span> y un value
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) =>{
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    return(
        <section className="filters">
            <div>
                <label htmlFor={ minPriceFilterId }>Precio desde:</label>
                <input 
                    type="range"
                    id={ minPriceFilterId }
                    min='0'
                    max='1000' 
                    onChange={ handleChangePrice }
                    value={ filters.minPrice }
                />
                <span>${ filters.minPrice }</span>
            </div>

            <div>
                <label htmlFor={ categoryFilterId }>Categoría</label>
                <select name="category" id={ categoryFilterId } onChange={ handleChangeCategory }>
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}
```

Ahora podemos ver que está todo sincronizadooo!!! y sólo tiene una fuente de la verdad.

# Simplificando el footer
Pasa un poco lo mismo, dejemos limpio el componente `<Footer />` que se está renderizando en `App.jsx` en lugar de pasarle props lo podemos hacer así:

```jsx
import { useState } from "react";
import { Products } from "./components/Products";
import { products as initialProducts } from "./mocks/products.json";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { IS_DEVELOPMENT } from './config.js';
import { useFilters } from "./hooks/useFilters.jsx";

function App() {
  const [products] = useState(initialProducts);

  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <>
      <Header />
      <Products products={ filteredProducts } />
      {IS_DEVELOPMENT && <Footer />}
    </>
  );
}

export default App;
```

Vamos a cambiar en `Footer.jsx` 
```jsx
import { useFilters } from '../hooks/useFilters';
import './Footer.css'

//en lugar de pasarselo por props
export function Footer () {
  const { filters } = useFilters();

  return (
    <footer className='footer'>
      {
        JSON.stringify(filters, null, 2)
      }

      {/* <h4><span>Nestor Rivas</span></h4>
      <h5>Shopping Cart con useContext & useReducer</h5> */}
    </footer>
  )
}
```

Ya con esto, estaríamos evitando tanto uso de las props, prop drilling, hemos evitado las dos fuentes de la verdad. con esto cumplimos hasta el cuarto punto del # Enunciado 1. Ecommerce