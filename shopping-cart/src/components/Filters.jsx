import { useState, useId } from 'react';
import './Filters.css';

export function Filters ({ onChange }) {
    const  [minPrice, setMinPrice] = useState(0);
    //generando dos Ids
    const minPriceFilterId = useId();//colocamos esto dentro de label htmlFor y el input
    const categoryFilterId = useId();

    console.log({ minPriceFilterId, categoryFilterId });
    
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