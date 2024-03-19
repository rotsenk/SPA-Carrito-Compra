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