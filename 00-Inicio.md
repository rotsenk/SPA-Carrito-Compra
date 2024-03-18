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