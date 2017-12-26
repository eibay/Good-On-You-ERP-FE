import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCause, fetchAllCause, createCause, updateCause } from '../../actions'
import { QualiHeading } from '../../components'
import { Form, Radio} from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'

import './brandCauses.css'

class BrandCauses extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      save: false
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
componentWillMount() {
  const { id }  = this.props.match.params
  this.props.fetchCause(id)
  this.props.fetchAllCause(id)
}

componentWillReceiveProps(nextProps) {
  if(nextProps.qa !== this.props.qa) {
    _.map(nextProps.qa, quest => {
      this.setState({
        [quest.question]: quest.answer,
        [`${quest.question}Original`]: quest.answer,
        [`${quest.question}Answer`]: quest.cause.text,
        [`${quest.question}OriginalAnswer`]: quest.cause.text
      })
  })
}
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state[event.target.name]){
      //if state of target button 'name' already exists, will set state of same target name to the current answer value and also toggle editing
      this.setState({isEditing: event.target.value, currentAnswer: this.state[event.target.value]})
      console.log('state answer');
    }
    //if an answer has not yet been created(first time visiting this specific question for this brand), will create a post request and toggle editing
    else {
      this.props.createCause({brand: id, question: event.target.name, answer: event.target.value})
      this.setState({isEditing: event.target.value})
      console.log('post');
    }
  }
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({
      isEditing: null,
      [`${event.target.name}Answer`]: this.state[`${event.target.name}OriginalAnswer`],
      [event.target.name]: this.state[`${event.target.name}Original`],
      currentAnswer: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.updateCause(id, event.target.name, {answer: this.state.currentAnswer})
    this.setState({isEditing: null, save: true})
  }

  handleChange(event, { value, name }){
    _.map(this.props.pre_qa, check => {
      if(check.id === parseInt(value)) {
        console.log('check', check);
        this.setState({[`${name}Answer`]: check.text})
      }
    })
    console.log('value', value, name);
    this.setState({
      [name]: parseInt(value),
      currentAnswer: parseInt(value)
    })
  }

  renderQuestion(quest) {
    return _.map(this.props.pre_qa, ans => {
      if(ans.question === quest)
      return(
        <Form.Field inline key={ans.id}>
          <Radio
            label={ans.text}
            onChange={this.handleChange}
            checked={this.state[quest] === ans.id ? true : false}
            value={ans.id}
            name={ans.question}
          />
        </Form.Field>
      )
    })
  }

//render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.qa);
    console.log('pre_qa', this.props.pre_qa);
    console.log('state', this.state);
    const { id }  = this.props.match.params
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.qa
    return(
      <div className='form-container'>
        <QualiHeading />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/brandContact/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Causes</h3></div>
            <div><Link to={`/brandSentences/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <Form>
        {isEditing === '1' ? (
          <div className='editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
                  {this.renderQuestion('made-in')}
            <div className='button-container'>
              <div><button className='cancel' name='made-in' onClick={this.handleCancel} >Cancel</button></div>
              <div><button name='made-in' onClick={this.handleSave}  value='1'>Save</button></div>
            </div>
          </div>) : (
          <div className='not-editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
            <p>{state['made-inAnswer']}</p>
            <div className='button-container'>
              <div></div>
              <div><button name='made-in' onClick={this.handleEdit} value='1'>Edit</button></div>
            </div>

          </div>
            )}
        {isEditing === '6' ? (
          <div className='editing'>
          <h4>Is the Brand Certified B-Corp?</h4>
              {this.renderQuestion('b-corp')}
          <div className='button-container'>
            <div><button className='cancel' name='b-corp' onClick={this.handleCancel}>Cancel</button></div>
            <div><button name='b-corp' onClick={this.handleSave} value='6'>Save</button></div>
          </div>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the Brand Certified B-Corp?</h4>
            <div>{state['b-corpAnswer']}</div>
            <div className='button-container'>
              <div></div>
              <div><button name='b-corp' onClick={this.handleEdit} value='6'>Edit</button></div>
            </div>
          </div>
        )}

        {isEditing === '8'? (
          <div className='editing'>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
              {this.renderQuestion('social-enterprise')}
          <div className='button-container'>
            <div><button className='cancel' name='social-enterprise' onClick={this.handleCancel}>Cancel</button></div>
            <div><button name='social-enterprise' onClick={this.handleSave} value='8'>Save</button></div>
          </div>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <div>{state['social-enterpriseAnswer']}</div>
            <div className='button-container'>
              <div></div>
              <div><button name='social-enterprise' onClick={this.handleEdit} value='8'>Edit</button></div>
            </div>
          </div>
          )}

        {isEditing === '10' ? (
          <div className='editing'>
          <h4>Does the brand have a 1 for 1 model?</h4>
              {this.renderQuestion('1-for-1')}
          <div className='button-container'>
            <div><button className='cancel' name='1-for-1' onClick={this.handleCancel}>Cancel</button></div>
            <div><button name='1-for-1' onClick={this.handleSave} value='10'>Save</button></div>
          </div>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand have a 1 for 1 model?</h4>
            <div>{state['1-for-1Answer']}</div>
            <div className='button-container'>
              <div></div>
              <div><button name='1-for-1' onClick={this.handleEdit} value='10'>Edit</button></div>
            </div>
          </div>
          )}

        {isEditing === '12' ? (
          <div className='editing'>
          <h4>Is the brand Vegan?</h4>
              {this.renderQuestion('vegan')}
          <div className='button-container'>
            <div><button className='cancel' name='vegan' onClick={this.handleCancel}>Cancel</button></div>
            <div><button name='vegan' onClick={this.handleSave} value='12'>Save</button></div>
          </div>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the brand Vegan?</h4>
            <div>{state.veganAnswer}</div>
            <div className='button-container'>
              <div></div>
              <div><button name='vegan' onClick={this.handleEdit} value='12'>Edit</button></div>
            </div>
          </div>
          )}

        {isEditing === '14' ? (
          <div className='editing'>
          <h4>What Percentage of the brands products are certified Fair Trade?</h4>
              {this.renderQuestion('fair-trade')}
            <div className='button-container'>
              <div><button className='cancel' name='fair-trade' onClick={this.handleCancel}>Cancel</button></div>
              <div><button name='fair-trade' onClick={this.handleSave} value='14'>Save</button></div>
            </div>
          </div>) : (
          <div className='not-editing'>
            <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <div>{state['fair-tradeAnswer']}</div>
            <div className='button-container'>
              <div></div>
              <div><button name='fair-trade' onClick={this.handleEdit} value='14'>Edit</button></div>
            </div>
          </div>
          )}

        {isEditing === '16' ? (
          <div className='editing'>
          <h4>What percentage of products are made from certified Organic materials?</h4>
              {this.renderQuestion('organic')}
          <div className='button-container'>
            <div><button className='cancel' name='organic' onClick={this.handleCancel}>Cancel</button></div>
            <div><button name='organic' onClick={this.handleSave} value='16'>Save</button></div>
          </div>
          </div>) : (
          <div className='not-editing'>
            <h4>What percentage of products are made from certified Organic materials?</h4>
            <div>{state.organicAnswer}</div>
            <div className='button-container'>
              <div></div>
              <div><button name='organic' onClick={this.handleEdit} value='16'>Edit</button></div>
            </div>
          </div>
          )}
        {isEditing === '18' ? (
          <div className='editing'>
          <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
              {this.renderQuestion('recycled')}
          <div className='button-container'>
            <div><button className='cancel' name='recycled' onClick={this.handleCancel}>Cancel</button></div>
            <div><button name='recycled' onClick={this.handleSave} value='18'>Save</button></div>
          </div>
          </div>) : (
          <div className='not-editing'>
            <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <div>{state.recycledAnswer}</div>
            <div className='button-container'>
              <div></div>
              <div><button name='recycled' onClick={this.handleEdit} value='18'>Edit</button></div>
            </div>
          </div>
          )}
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    qa: state.qa,
    pre_qa: state.preQa
  }
}

export default connect(mapStateToProps, { fetchCause, fetchAllCause, updateCause, createCause })(BrandCauses)
