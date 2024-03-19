# useID
Para solucionar el problema del prop drillling, podemos hacerlo con el contexto, pero antes tenemos que usar un hook que nos permita evitar el prop drilling
Porque un id como "price" es bastante fácil que se nos olvide, la podemos líar

`useID` para crear identificadores, en lugar de usar los id manualmente, este nos genera un identificador único.

- Vamos a `Filters.jsx` y modificamos...
```js
import { useState, useId } from 'react';
import './Filters.css';

export function Filters ({ onChange }) {
    const  [minPrice, setMinPrice] = useState(0);
    //generando dos Ids
    const minPriceFilterId = useId();//colocamos esto dentro de label htmlFor y el input
    const categoryFilterId = useId();
    
    const handleChangePrice = (event) => {
        setMinPrice(event.target.value);
        onChange(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) =>{
        onChange(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }
    //y lo colocamos en el Select

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
                />
                <span>${ minPrice }</span>
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

## Pero, esto cómo funciona?
Podemos hacer un `console.log` dentro de la `function Filters`:

```js
console.log({ minPriceFilterId, categoryFilterId });
```

Este utiliza la posición y el orden, guarda eso, y siempre mantiene el mismo, son totalmente válidos como Id, un identificador único que no va a cambiar, se usa en algo que se está iterando.

`useId` sirve para este tipo de ids, es un estado, se vuelve a generar el estado y al renderizar el componente se ejecuta el `filteredProducts`