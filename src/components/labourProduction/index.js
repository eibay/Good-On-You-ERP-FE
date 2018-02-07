import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LabourProduction extends Component {

  render() {
    console.log('params', this.props)
    return(
      <div className='rating-header'>
        <div className='forms-header'><Link to={`/brandLanding/${this.props.id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/labour-supply-chain/${this.props.id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Low Risk Production</h3></div>
            <div><Link to={`/labour-living-wage/${this.props.id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
      </div>
    )
  }
}


export default LabourProduction
