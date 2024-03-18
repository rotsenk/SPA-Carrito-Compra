# SPA-Carrito-Compra
Desarrollo de aplicación de carrito de Compras con React

- Hooks con `useContext` para manejo del Estado Global
- Manejar estados complejo con useReducer
- Uso correcto de `useID`

# Enunciado
## 1. Ecommerce
- Muestra una lista de productos que vengan de un JSON
- Añadir un filtro por categoría
- Añadir un filtro por precio

Hacer uso de `useContext` para evitar pasar props innecesarias.

## 2. Shopping Cart
- Añadir los productos al carrito
- Eliminar productos del carrito
- Modificar la cantidad de productos del carrito
- Sincronizar los cambios del carrito con la lista de productos
- Guardar en un `localStorage` el carrito para que se recupere al recargar la página

# Comencemos...
- Crear dentro de `src` una carpeta con el nombre de `mocks` y dentro de esta carpeta crear el archivo `products.json`
- No haremos fetch, aunque se puede hacer perfectamente
- Lo interesante es utilizar `useContext`, `useReducer`, `useID`

## Datos JSON
Los datos json los sacaremos de la siguiente url: https://dummyjson.com/