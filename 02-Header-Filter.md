# Header y filtros
Ahora haremos un componente para el header, y que de forma visual podamos filtrar, asimismo, haremos un componente para filtros

- Creamos el componente `Header.jsx`
```js
import { Filters } from './Filters.jsx';

export function Header () {
    return(
        <header>
            <h1>React Shop</h1>
            <Filters />
        </header>
    )
}
```
- Importamos en `App.jsx` 
`import { Header } from "./components/Header";`
y colocamos sobre el componente `<Products />`
```js
return (
    <>
      <Header />
      <Products products={ filteredProducts } />
    </>
  );
```

- Creamos el componente `Filters.jsx`
```js
import './Filters.css'

export function Filters () {
    //el filtro del precio lo podemos hacer con un rango
    //es bastante sencillo
    //colocaremos un input de typo rango
    return(
        <section className="filters">
            <div>
                <label htmlFor="price">Precio</label>
                <input 
                    type="range"
                    id="price"
                    min='0'
                    max='1000' 
                />
            </div>

            <div>
                <label htmlFor="category">Categoría</label>
                <select name="category" id="category">
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}
```

## Estilos para Filtros
Creamos el componente `Filters.css` y le damos estilos a los filtros
```css
import './Filters.css'

export function Filters () {
    //el filtro del precio lo podemos hacer con un rango
    //es bastante sencillo
    //colocaremos un input de typo rango
    return(
        <section className="filters">
            <div>
                <label htmlFor="price">Precio</label>
                <input 
                    type="range"
                    id="price"
                    min='0'
                    max='1000' 
                />
            </div>

            <div>
                <label htmlFor="category">Categoría</label>
                <select name="category" id="category">
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}
```

## Problemas?..
Tenemos un problema con el rango, porque en el rango no sabemos el precio, no tenemos ni idea de lo que estamos filtrando
- Si pasamos un rango, siempre, siempre, tenemos que mostrar de cuánto es el rango
- Estado que permite saber dónde está y mostrar en el render

```js
import { useState } from 'react';//importar el useState
import './Filters.css';

export function Filters () {
    //crear estado que nos va a permitir saber dónde está
    const  [minPrice, setMinPrice] = useState(0)
    
    //tenemos que utilizar un onChange para que cada vez que cambie, podamos renderizar
    const handleChangePrice = (event) => {
        setMinPrice(event.target.value);
    }

    return(
        <section className="filters">
            <div>
                <label htmlFor="price">Precio desde:</label>
                <input 
                    type="range"
                    id="price"
                    min='0'
                    max='1000' 
                    onChange={ handleChangePrice }
                />
                <span>${ minPrice }</span>
            </div>

            <div>
                <label htmlFor="category">Categoría</label>
                <select name="category" id="category">
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}
```
Ahora ya mostramos los filtros, pero por el momento no son funcionales.