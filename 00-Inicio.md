# Crear la plantilla
- Crear la app `npm init vite@latest shopping-cart -- --template react`
- acceder a la carpeta cd `shopping-cart`
- instalar dependencias `npm install`
- instalar eslinter npm `install standard -D`


ir a package.json y configurar debajo de "devDependencies"
```json
"eslintConfig":{
    "extends": ["standard"]
  }
```

-Instalar React Router Dom `npm install react-router-dom -E`

- Después verificar si se instaló en el `package.json`

```json
"dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3"
  },
```

- ejecutar app npm run dev y verificar que corra bien

# Comencemos...
- Crear dentro de `src` una carpeta con el nombre de `mocks` y dentro de esta carpeta integrar el archivo `products.json`
- No haremos fetch, aunque se puede hacer perfectamente pero no lo haremos con fetch
- Lo interesante es utilizar `useContext`, `useReducer`, `useID`

## Datos JSON
Los datos json los sacaremos de la siguiente url: https://dummyjson.com/

## Configurando...
- Eliminar archivos que no usaremos como `App.css`
- Eliminar código de `App.jsx` a modo de dejarlo así:
```js
function App() {
  return (
    <>
      <h1>Shopping cart!</h1>
    </>
  );
}

export default App;

```
- En el `index.css` podemos configurar los estilos, también hay una plantilla de archivos precreados, muy similares pero con una pequela modificación
- Crear carpeta llamada `components` para que vayamos guardando nuestros componentes
- El primer componente que guradaremos será el de los íconos `Icons.jsx` un archivo precreado

# Comenzando a crear componentes
- El primer componente a crear es el de `Products.jsx`

```jsx
import "./Products.css";
import { AddToCartIcon } from "./Icons.jsx";

export function Products({ products }) {
  return (
    <main className="products">
      <ul>
        {products.map((product) => (
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
      </ul>
    </main>
  );
}

```

Este código define un componente de React llamado `Products` que recibe un arreglo de productos (`products`) como prop y muestra una lista de productos en la interfaz de usuario.

### Importación de Estilos y Componentes
- `import "./Products.css";`: Importa los estilos CSS del componente `Products` desde un archivo llamado `Products.css`.
- `import { AddToCartIcon } from "./Icons.jsx";`: Importa el componente `AddToCartIcon` desde un archivo llamado `Icons.jsx`. Presumiblemente, este componente contiene un icono que se mostrará junto a cada producto.

### Definición del Componente `Products`
- `export function Products({ products }) { ... }`: Define una función de componente llamada `Products` que recibe un objeto `products` como argumento destructurado. Este objeto contiene un arreglo de productos que se mostrarán en la lista.

### Renderizado de la Lista de Productos
- El componente `Products` devuelve un elemento `main` que contiene una lista `ul`.
- Se utiliza el método `map` para recorrer el arreglo de productos y generar un elemento `li` para cada producto.
- Cada producto tiene un `key` único que se establece como el `id` del producto.
- Dentro de cada `li`, se muestra una imagen del producto (`img`) con la URL obtenida de `product.thumbnail` y el texto alternativo del producto obtenido de `product.title`.
- Luego, se muestra el título del producto (`product.title`) dentro de un elemento `strong`.
- También se agrega un botón que, presumiblemente, permite agregar el producto al carrito. Este botón incluye el componente `AddToCartIcon`.

## Importar el componente en nuestro `App.jsx`
```jsx
import { Products } from "./components/Products";
import { products } from "./mocks/products.json";


function App() {
  return (
    <>
      <Products products={ products } />
    </>
  );
}

export default App;
```
# Estilos básicos
- Crear el componente `Products.css` dentro de nuestra carpeta de `components`
```css
.products{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.products ul{
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(
            100px,
            1fr
        )
    );
    gap: 1rem;
}

.products li{
    display: flex;
    flex-direction: column;
}
```

- `display: grid;`: Aplica el modelo de caja de cuadrícula para el diseño de la lista de productos.
- `grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));`: Define las columnas de la cuadrícula de manera que se ajusten automáticamente al ancho del contenedor, con un ancho mínimo de 100px y se expandan para llenar el espacio disponible.
- `gap: 1rem;`: Establece un espacio de 1rem entre las celdas de la cuadrícula.
- `display: flex;`: Utiliza el modelo de caja flexbox para los elementos de la lista de productos.
- `flex-direction: column;`: Establece que los elementos de la lista se apilen verticalmente, es decir, que su eje principal sea vertical.