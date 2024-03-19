import { useState } from 'react';
import './Filters.css';

export function Filters ({ onChange }) {
    const  [minPrice, setMinPrice] = useState(0);
    
    const handleChangePrice = (event) => {
        setMinPrice(event.target.value);
        /**lo llamamos tanto por si cambiamos el precio,
         *  obtener el estado previo, y el nuevo estado */
        //Esto funciona, pero no está bien!!!!!!!!
        //Aquí hay dos fuentes de la verdad, es un problema realmente, luego lo arreglamos
        onChange(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    //hacemos un handle para categoría
    //Pero esto está mal, porque 
    //estamos pasando la función de actualizar estado
    //nativa de React a un componente hijo
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
                <select name="category" id="category" onChange={ handleChangeCategory }>
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}