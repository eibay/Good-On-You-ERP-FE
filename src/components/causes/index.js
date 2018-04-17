import React from 'react'
import './causes.css'
import _ from 'lodash'

const Causes = (props) => {
  return _.map(props.causes, (cause, index) => {
    return (
      <div className='cause-content' key={index}>
        <div className='cause-item'><span className='cause-name'>{cause.name.replace(/\b\w/g, function (l) { return l.toUpperCase() })}</span><span className='cause-value'> {cause.value}</span></div>
      </div>
    )
  })
}

export default Causes