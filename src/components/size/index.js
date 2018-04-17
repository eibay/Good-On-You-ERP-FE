import React from 'react'
import './size.css'
import { Icon } from 'semantic-ui-react'


const Size = (props) => {
  return (
    <span>
      {(props.size === 'small') ? (<div>Small / <span className='gray-out'>Large</span></div>) : (<div><span className='gray-out'>Small</span> / Large </div>)}
    </span>
  )
}

export default Size