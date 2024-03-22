import { useId } from 'react';
import './Filters.css';
import { useFilters } from '../hooks/useFilters';

export function Filters () {
    //nos vamos a fiar de los filtros globales.
    const { filters, setFilters } = useFilters();
 
    const minPriceFilterId = useId();
    const categoryFilterId = useId();
    
    const handleChangePrice = (event) => {
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
                    value={ filters.minPrice }
                />
                <span>${ filters.minPrice }</span>
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