import './Footer.css'

//pasamos filters como props
//se puede construir una especie de Debugger
export function Footer ({ filters }) {
  return (
    <footer className='footer'>
      {
        JSON.stringify(filters, null, 2)
      }

      {/* <h4><span>Nestor Rivas</span></h4>
      <h5>Shopping Cart con useContext & useReducer</h5> */}
    </footer>
  )
}
