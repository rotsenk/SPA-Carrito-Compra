import { useState, useId } from 'react';
import './Filters.css';
import { useFilters } from '../hooks/useFilters';

export function Filters () {
    const { setFilters } = useFilters();//cada vez que queramos cambiar el estado

    const  [minPrice, setMinPrice] = useState(0);
 
    const minPriceFilterId = useId();
    const categoryFilterId = useId();
    
    const handleChangePrice = (event) => {
        setMinPrice(event.target.value);
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