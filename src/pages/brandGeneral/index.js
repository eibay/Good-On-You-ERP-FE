import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchGeneral, updateGeneral, createBrandSize, deleteBrandSize } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class BrandGeneral extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: '',
      sizeValues: [],
      sizeOptions: ['alexa', 'insta-fb', 'linked-in', 'manual', 'subsidiary', 'listed'],
      input: null
    }


    this.handleRadio = this.handleRadio.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmitSize = this.handleSubmitSize.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchGeneral(id, 'general')
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.is_large === true || this.state.is_large === false) {
      this.setState({isEditing: event.target.value})
    } else {
      this.setState({is_large: this.props.qa.is_large, isEditing: event.target.value})
      console.log('return');
    }
    _.mapValues(this.props.qa.size, crit => {
      this.setState({[crit.criteria]: crit.criteria})
    })
}
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null, currentAnswer: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    const { id }  = this.props.match.params
    this.props.updateGeneral(id, {name: this.state.name, sustainability_report_date: this.state.sustainability_report_date, review_date: this.state.review_date, parent_company: this.state.parent_company, is_large:this.state.is_large})
    this.setState({isEditing: null})
    console.log('save', this.state);
  }

  handleSubmitSize(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    _.map(this.state.sizeOptions, options => {
        this.props.deleteBrandSize(id, options)

    })
    _.map(this.state.sizeValues, size => {
      if(!this.props.qa.size) {
        this.props.createBrandSize({brand: id, criteria: size})
      }
    })
    this.setState({isEditing: null})
  }

  handleCheckbox(event) {
    const { id }  = this.props.match.params
    if(this.state[event.target.name] === event.target.name) {
      this.setState({[event.target.name]: null})
    }
    if(this.state.sizeValues.includes(event.target.name)) {
      this.state.sizeValues.splice(this.state.sizeValues.indexOf(event.target.name), 1)
      console.log(this.state.sizeValues);
    } else {
      this.setState({sizeValues: [...this.state.sizeValues, event.target.name], [event.target.name]: event.target.name})
      console.log(this.state.sizeValues);
    }
  }

  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleRadio(event){
    if(event.target.name ==='small') {
      this.setState({is_large: false})
    }
    if(event.target.name === 'large') {
      this.setState({is_large: true})
    }
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({currentAnswer: event.target.name, [event.target.name]: event.target.value, input: event.target.value})
  }


  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <FormsHeader />
        <form className='brand-form'>
        {isEditing === '1' ? (
          <div className='editing'>
          <h5>What is the Brand Name and Website?</h5>
            <ul>
              <li>Brand Name: <Field
                placeholder={this.props.qa.name}
                onChange={this.handleInput}
                name='name'
                component='input' />
              </li>
              <div> Brand Website: </div><div>{this.props.qa.website}</div>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} name='1' value='1'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h5>What is the Brand Name and Website?</h5>
            <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
          </div>
          )}
            <div className='not-editing'>
              <h5>What is the rating date and verification date</h5>
              <div>Rating Date: {this.props.qa.rating_date ? this.props.qa.rating_date : 'MM/DD/YYYY'}</div>
              <div>Verification Date: {this.props.qa.verification_date ? this.props.qa.verification_date : 'MM/DD/YYYY'}</div>
            </div>
            {isEditing === '3' ? (
              <div className='editing'>
              <h5>Which month does the brand release its sustainability report?</h5>
                <ul>
                  <li>Sustainability Report Date: <Field
                    placeholder={this.props.qa.sustainability_report_date ? this.props.qa.sustainability_report_date : 'DD/MM/YYYY'}
                    onFocus={this.handleInput}
                    onChange={this.handleInput}
                    name='sustainability_report_date'
                    component='input' />
                  </li>
                </ul>
                <button onClick={this.handleCancel}>Cancel</button>
                <button onClick={this.handleSave} name='3' value='3'>Save</button>
              </div>) : (
              <div className='not-editing'>
                <h5>Which month does the brand release its sustainability report?</h5>
                <button name='3' onClick={this.handleEdit} value='3'>Edit</button>
              </div>
              )}
              {isEditing === '4' ? (
                <div className='editing'>
                <h5>Which month does Good On You need to review the Brand?</h5>
                  <ul>
                    <li>Brand Review Date: <Field
                      placeholder={this.props.qa.review_date ? this.props.qa.review_date : 'DD/MM/YYYY'}
                      onFocus={this.handleInput}
                      onChange={this.handleInput}
                      name='review_date'
                      component='input' />
                    </li>
                  </ul>
                  <button onClick={this.handleCancel}>Cancel</button>
                  <button onClick={this.handleSave} name='4' value='4'>Save</button>
                </div>) : (
                <div className='not-editing'>
                  <h5>Which month does Good On You need to review the Brand?</h5>
                  <button name='4' onClick={this.handleEdit} value='4'>Edit</button>
                </div>
                )}
                {isEditing === '5' ? (
                  <div className='editing'>
                  <h5>What is the size of the Brand?</h5>
                    <ul>
                      <h5>Brand Size: </h5>
                      <li> <Field
                        type='radio'
                        onChange={this.handleRadio}
                        name='small'
                        checked={this.state.is_large === false}
                        component='input' />Small
                      </li>
                      <li> <Field
                        type='radio'
                        onChange={this.handleRadio}
                        name='large'
                        checked={this.state.is_large === true}
                        component='input' />Large
                      </li>
                    </ul>
                      <ul>
                      <h5>Does the Brand meet at least one of the following large brand criteria?</h5>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleCheckbox}
                          checked={this.state.listed}
                          name='listed'
                          component='input' />Listed Company
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleCheckbox}
                          checked={this.state.subsidiary}
                          name='subsidiary'
                          component='input' />Subsidiary Company
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleCheckbox}
                          checked={this.state.alexa}
                          name='alexa'
                          component='input' />Alexa &#60; 200k
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleCheckbox}
                          checked={this.state['insta-fb']}
                          name='insta-fb'
                          component='input' />Insta + FB &#62; 75k
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleCheckbox}
                          checked={this.state['linked-in']}
                          name='linked-in'
                          component='input' />Linkedin employees &#62; 50
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleCheckbox}
                          checked={this.state.manual}
                          name='manual'
                          component='input' />Manual override after company provided data satisfying Good On You criteria
                        </li>
                      </ul>
                      <ul>
                      <h5>Parent Company Name: </h5>
                        <li> <Field
                          placeholder={this.props.qa.parent_company}
                          onFocus={this.handleInput}
                          onChange={this.handleInput}
                          name='parent_company'
                          component='input' />
                        </li>
                      </ul>
                    <button onClick={this.handleCancel}>Cancel</button>
                    <button onClick={this.handleSubmitSize} name='5' value='5'>Save</button>
                  </div>) : (
                  <div className='not-editing'>
                    <h5>What is the size of the Brand?</h5>
                    <button name='5' onClick={this.handleEdit} value='5'>Edit</button>
                  </div>
                  )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default reduxForm({
  form: 'BrandGeneralForm'
})(
  connect(mapStateToProps, { updateGeneral, fetchGeneral, createBrandSize, deleteBrandSize})(BrandGeneral)
)
