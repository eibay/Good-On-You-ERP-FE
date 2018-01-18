import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Form, Checkbox, Progress } from 'semantic-ui-react'
import { fetchType, createType, deleteType } from '../../actions'
import { SuppHeading } from '../../components'
import _ from 'lodash'

class SuppDataTypes extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      typeValues: [],
      deleteValues: [],
      typeOptions: ['activewear', 'casualwear', 'eveningwear', 'smartcasual', 'workwear'],
      save: false,
      progressBar: 0,
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchType(id)
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props.match.params
    if(nextProps.qa !== this.props.qa) {
      _.mapValues(nextProps.qa, type => {
        this.setState({[type.product]: type.product})
      })
      if(Object.keys(nextProps.qa).length > 0) {
        this.state.progressBar++
      }
      // this.setState({typeValues: _.map(nextProps.qa, type => {return {brand: id, product: type.product} })})
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: event.target.name})
  }
  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.default()
    this.setState({isEditing: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    _.map(this.state.deleteValues, type => {
      this.props.deleteType(id, type)
    })
    this.props.createType(this.state.typeValues)
    this.setState({isEditing: null})
    this.state.progressBar++
  }

  handleCheckbox(event, { name }) {
    const { id }  = this.props.match.params
    if(this.state[name] === name) {
      this.setState({
        [name]: null,
        typeValues: this.state.typeValues.filter(type => {return type.product !== name}),
        deleteValues: [...this.state.deleteValues, name],
      })
    } else {
      this.setState({
        [name]: name,
        typeValues: [...this.state.typeValues, {brand: id, product: name}],
        deleteValues: this.state.deleteValues.filter(type => {return type !== name}),
      })
    }
  }

  renderSelected() {
    return _.map(this.state.typeOptions, type => {
      if(this.state[type] === type)
        return(
          <li key={type}>
            {type}
          </li>
        )
    })
  }

  render() {
    console.log('props', this.props.qa)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.qa
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataStyles/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Product Types</h3></div>
            <div><Link to={`/suppDataRetailers/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={1} value={state.progressBar} progress />
        <form className='brand-form'>
          {isEditing === '1' ? (
            <div className='editing'>
              <h5>What are the product types?  Select one or more *</h5>
              <Form.Field inline>
                <Checkbox
                  label='Workwear'
                  onChange={this.handleCheckbox}
                  checked={state.workwear ? true : false}
                  name='workwear'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Activewear'
                  onChange={this.handleCheckbox}
                  checked={state.activewear ? true : false}
                  name='activewear'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Casualwear'
                  onChange={this.handleCheckbox}
                  checked={state.casualwear ? true : false}
                  name='casualwear'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Eveningwear'
                  onChange={this.handleCheckbox}
                  checked={state.eveningwear ? true : false}
                  name='eveningwear'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Smart Casual'
                  onChange={this.handleCheckbox}
                  checked={state.smartcasual ? true : false}
                  name='smartcasual'
                />
              </Form.Field>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='1'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>What are the product types? *</h5>
              <p>{this.renderSelected()}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='1' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    qa: state.qa,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchType, createType, deleteType})(SuppDataTypes)
