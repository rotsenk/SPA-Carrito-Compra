# Agregar más diseño al `Products.css`
- Agregaremos más diseño
```css
.products li{
    display: flex;
    flex-direction: column;
    
    gap: 1rem;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: #111;
    color: #fff;
    padding: 1rem;
}

.products h3{
    margin: 0;
}

.products span{
    font-size: 1rem;
    opacity: .9;
}

.products img{
    border-radius: 4px;
    width: 100%;
    aspect-ratio: 16/9;
    display: block;
    object-fit: cover;
    background: #fff;
}
```
> Se debe explicar mostrando visualmente lo que hace cada código

# Filtrar
- Debemos filtrar para que no se muestren todos o tantos productos
- Haciendo un `slice` del cero al doce en nuestro componente `Products.jsx`
- Quedando nuestra porción de código modificada así:
```jsx
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
            <button>
                <AddToCartIcon />
            </button>
        </div>
    </li>
))}
```

## Estado Global
- Necesitamos tener un estado para cambiar los filtros, para poder filtrar
- Nos dirigimos a nuestro `App.jsx`
```js
import { useState } from "react";
import { Products } from "./components/Products";
import { products as initialProducts } from "./mocks/products.json";


function App() {
  const [products] = useState(initialProducts);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  });

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

  const filteredProducts = filterProducts(products);

  return (
    <>
      <Products products={ filteredProducts } />
    </>
  );
}

export default App;

```

En este momento ya tenemos funcionando el filtro, aunque no está del todo bien, porque visualmente no podemos hacer nada, pero podemos modificar y simular que tendríamos un filtro en nuestra app de forma visual

### Explicación del Código
Este código es un componente de React que muestra una lista de productos filtrados según ciertos criterios. Aquí está la explicación línea por línea:

1. `import { useState } from "react";`: Importa la función `useState` de la biblioteca React. `useState` se utiliza para manejar el estado en componentes de función.

2. `import { Products } from "./components/Products";`: Importa el componente `Products` desde el archivo `Products.js` en el directorio `components`.

3. `import { products as initialProducts } from "./mocks/products.json";`: Importa un conjunto inicial de productos desde un archivo JSON en `mocks/products.json`. Los productos se renombran como `initialProducts`.

4. `function App() { ... }`: Define un componente de función llamado `App`.

5. `const [products] = useState(initialProducts);`: Declara un estado llamado `products` utilizando `useState`, con el valor inicial establecido en `initialProducts`. Esto significa que `products` contendrá la lista de productos y será inmutable durante el ciclo de vida del componente.

6. `const [filters, setFilters] = useState({ category: 'all', minPrice: 0 });`: Declara un estado llamado `filters` utilizando `useState`, con el valor inicial establecido en un objeto que contiene las propiedades `category` (categoría) y `minPrice` (precio mínimo). `setFilters` es una función que se utilizará para actualizar el estado `filters`.

7. `const filterProducts = (products) => { ... }`: Define una función llamada `filterProducts` que toma una lista de productos como argumento y filtra estos productos según los criterios especificados en el estado `filters`.

8. `return products.filter(product => { ... })`: Utiliza el método `filter` en la lista de productos para filtrarlos según el precio mínimo y la categoría seleccionada en los filtros.

9. `const filteredProducts = filterProducts(products);`: Llama a la función `filterProducts` con la lista de productos `products` y guarda el resultado en la variable `filteredProducts`.

10. `return ( ... )`: Devuelve JSX, que es la representación del componente en la interfaz de usuario.

11. `<Products products={ filteredProducts } />`: Renderiza el componente `Products` y pasa los productos filtrados como prop `products`.

En resumen, este componente `App` utiliza estados para mantener la lista de productos y los filtros aplicados, luego filtra la lista de productos según los filtros y los pasa al componente `Products` para su visualización.
