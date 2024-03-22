import { useCart } from '../hooks/useCart';
import { useFilters } from '../hooks/useFilters';
import './Footer.css'

//en lugar de pasarselo por props
export function Footer () {
  const { filters } = useFilters();
  const { cart } = useCart();//ahora pasamos cart en el JSON.stringify

  return (
    <footer className='footer'>
      {
        JSON.stringify(filters, null, 2)
      }

      {
        JSON.stringify(cart, null, 2)
      }

      {/* <h4><span>Nestor Rivas</span></h4>
      <h5>Shopping Cart con useContext & useReducer</h5> */}
    </footer>
  )
}
