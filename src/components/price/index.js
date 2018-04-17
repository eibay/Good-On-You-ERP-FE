import React from 'react'
import './price.css'
import { Icon } from 'semantic-ui-react'


const Price = (props) => {
  return(
    <span className='price'>
      {props.price >= 1 ? (<div><span>$</span></div>) : (<div><span className='gray-out'>$</span></div>)}
      {props.price >= 2 ? (<div><span>$</span></div>) : (<div><span className='gray-out'>$</span></div>)}
      {props.price >= 3 ? (<div><span>$</span></div>) : (<div><span className='gray-out'>$</span></div>)}
      {props.price >= 4 ? (<div><span>$</span></div>) : (<div><span className='gray-out'>$</span></div>)}

    </span>
  )
}

export default Price
