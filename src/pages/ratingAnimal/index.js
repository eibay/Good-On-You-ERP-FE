import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllRating, fetchRating, createRating, updateRating } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'

class RatingAnimal extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      ratingValues: [],
      deleteValues: [],
      path: this.props.match,
      save: false
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleUrl = this.handleUrl.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchAllRating('resource')
  this.props.fetchRating(id, 'resource')
}

componentWillReceiveProps(nextProps) {
  const { id } = this.props.match.params
  if(nextProps.qa !== this.props.qa) {
    _.map(nextProps.qa, rate => {
      this.setState({[rate.id]: rate.id})
    })
    this.setState({ratingValues: _.map(nextProps.qa, check => {
      return {brand: id, answer: check.id, url: check.url, comment: check.comment}
      })
    })
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
    this.props.createQualiRating(this.state.typeValues)
    this.setState({isEditing: null})
  }

  handleCheckbox(event) {
    const { id }  = this.props.match.params
    if(this.state[event.target.name] === event.target.name) {
      this.setState({
        [event.target.name]: null,
        ratingValues: this.state.ratingValues.filter(rate => {return rate.answer !== parseInt(event.target.name)}),
        // deleteValues: [...this.state.deleteValues, event.target.name],
      })
    } else {
      this.setState({
        [event.target.name]: event.target.name,
        ratingValues: [...this.state.ratingValues, {brand: id, answer: parseInt(event.target.name), url: '', comment: ''}],
        // deleteValues: this.state.deleteValues.filter(type => {return type !== event.target.name})
      })
    }
  }

  handleUrl(event) {
    const { id }  = this.props.match.params
    _.map(this.state.ratingValues, check => {
      if(check.answer === parseInt(event.target.name)) {
        this.setState({ratingValues: [...check, {url: event.target.value}]})
      }
    })
  }


  renderQA() {
    return _.map(this.props.pre_qa, theme => {
      return _.map(theme.questions, type => {
          return(
            <ul>
              <li key={type.id}>
                {type.text}
              </li>
              <ul>
                {_.map(type.answers, ans => {
                  return (
                    <li key={ans.id}>
                      <input
                        type='checkbox'
                        name={ans.id}
                        onChange={this.handleCheckbox}
                        checked={this.state[ans.id]}
                        />
                        {ans.text}
                      <input
                        type='text'
                        onChange={this.handleUrl}
                        name={ans.id}
                      />
                      <textArea
                      />
                    </li>
                    )}
                  )}
              </ul>
            </ul>
          )
      })
    })
  }

  render() {
    console.log('pre qa props', this.props.pre_qa);
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <FormsHeader />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/ratingLabour/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Animal</h3></div>
            <div><Link to={`/brandCauses/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <form className='brand-form'>
          {isEditing === '1' ? (
            <div className='editing'>
                <div>
                <h5>What are the product types?  Select one or more?</h5>
                {this.renderQA()}
                </div>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='1'>Save</button>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the size of the Brand?</h5>
              <p>Current sizes:</p>
              <button name='1' onClick={this.handleEdit}>Edit</button>
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
      pre_qa: state.preQa
    }
  }

  export default connect(mapStateToProps, { fetchAllRating, fetchRating, createRating, updateRating })(RatingAnimal)
