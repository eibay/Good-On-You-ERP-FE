import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchGeneral, fetchContact, fetchBrandInfo } from '../../actions'
import { Icon } from 'semantic-ui-react'
import _ from 'lodash'

import './brandLanding.css'

class BrandLanding extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: null,
      generalProgress: 0,
      contactProgress: 0,
    }
    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchBrandInfo(id, 'general')
    this.props.fetchGeneral(id, 'general')
    this.props.fetchContact(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.general !== this.props.general) {
      if(nextProps.general.name) {
        this.state.generalProgress++
      }
      if(nextProps.general.review_date) {
        this.state.generalProgress++
      }
      if(nextProps.general.sustainability_report_date) {
        this.state.generalProgress++
      }
      if(nextProps.general.size) {
        this.state.generalProgress++
      }
    }
    if(nextProps.contact !== this.props.contact) {
      if(nextProps.contact.contact) {
        this.state.contactProgress++
      }
    }
  }

  handleShow(event) {
    event.preventDefault()
    this.setState({show: event.target.name})
  }

  handleHide(event) {
    event.preventDefault()
    this.setState({show: null})
  }

  render() {
    const  id   = this.props.match.params.id
    const props = this.props
    const state = this.state
    console.log('state', state)
    console.log('props', props)
    return(
      <div className='summary-container'>
        <div className='summary-heading'>Rate a brand for: <h1>{props.general.name}</h1></div>
        <p className='small-divider'></p>
        <div className='summary-heading'>URL: <h5>{props.general.website}</h5></div>
        <p className='small-divider'></p>
        <div className='summary-heading'><h1>Brand Overview</h1></div>
        <p className='divider'></p>
        <div className='summary-view'>
          <div>General</div>
          <div><p className='progress'>{state.generalProgress >= 4 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
          <div><Link to={`/brandGeneral/${id}`}><button>{state.generalProgress >= 4 ? 'View' : 'Start'}</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Contact Details</div>
          <div><p className='progress'>{state.contactProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
          <div><Link to={`/brandContact/${id}`}><button>{state.contactProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
        </div>
        <p className='small-divider'></p>

        <div className='summary-heading'><h1>Ratings</h1></div>
        <p className='divider'></p>
        <div className='summary-view'>
          <div>Environment</div>
          <div>{this.state.show !== 'environment' ?
            (<button name='environment' onClick={this.handleShow}>Show</button>) :
            (<button name='environment' onClick={this.handleHide}>Hide</button>)}
          </div>
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <p className='small-divider'></p>
              <span className='summary-view'>
                <div>Resource</div>
                <div><Link to={`/resource/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Climate Change</div>
                <div><Link to={`/energy/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Chemical</div>
                <div><Link to={`/chemical/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Water</div>
                <div><Link to={`/water/${id}`}><button>Start</button></Link></div>
              </span>
            </span> ) :
            (<span className='hide-summary'></span>)}

        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Labour</div>
          <div>{this.state.show !== 'labour' ?
            (<button name='labour' onClick={this.handleShow}>Show</button>) :
            (<button name='labour' onClick={this.handleHide}>Hide</button>)}
          </div>
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <p className='small-divider'></p>
              <span className='summary-view'>
                <div>Worker Policies</div>
                <div><Link to={`/worker_policies/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Wages</div>
                <div><Link to={`/wages/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Suppliers</div>
                <div><Link to={`/suppliers/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Practices</div>
                <div><Link to={`/practices/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Rights</div>
                <div><Link to={`/rights/${id}`}><button>Start</button></Link></div>
              </span>
            </span> ) :
            (<span className='hide-summary'></span>)}
        </div>
        <p className='small-divider'></p>

        <div className='summary-view'>
          <div>Animal</div>
          <div>{this.state.show !== 'animal' ?
            (<button name='animal' onClick={this.handleShow}>Show</button>) :
            (<button name='animal' onClick={this.handleHide}>Hide</button>)}
          </div>
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <p className='small-divider'></p>
              <span className='summary-view'>
                <div>Fur</div>
                <div><Link to={`/fur/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Leather</div>
                <div><Link to={`/leather/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Wool</div>
                <div><Link to={`/wool/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Feathers</div>
                <div><Link to={`/feathers/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Angora</div>
                <div><Link to={`/angora/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Hairs</div>
                <div><Link to={`/hairs/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>span
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Skins</div>
                <div><Link to={`/skins/${id}`}><button>Start</button></Link></div>
              </span>
            </span> ) :
            (<span className='hide-summary'></span>)}
        </div>
        <p className='small-divider'></p>

        <div className='summary-heading'><h1>Qualitative Ratings</h1></div>
        <p className='divider'></p>
        <div className='summary-view'>
          <div>Causes</div>
          <div><Link to={`/brandCauses/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Sentence</div>
          <div><Link to={`/brandSentences/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Summary</div>
          <div><Link to={`/brandSummary/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>

        <div className='summary-heading'><h1>Supplementary Data</h1></div>
        <p className='divider'></p>
        <div className='summary-view'>
          <div>Social Media</div>
          <div><Link to={`/suppDataSocialMedia/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Images</div>
          <div><Link to={`/suppDataImage/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Categories</div>
          <div><Link to={`/suppDataCategory/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Styles</div>
          <div><Link to={`/suppDataStyles/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Product Types</div>
          <div><Link to={`/suppDataTypes/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Retailers</div>
          <div><Link to={`/suppDataRetailers/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Price</div>
          <div><Link to={`/suppDataPrice/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Gender</div>
          <div><Link to={`/suppDataGender/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Brand Alias</div>
          <div><Link to={`/suppDataAlias/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('app state', state)
  return {
    contact: state.contactSumm,
    general: state.generalSumm,
  }
}

export default connect(mapStateToProps, { fetchGeneral, fetchContact, fetchBrandInfo })(BrandLanding)
