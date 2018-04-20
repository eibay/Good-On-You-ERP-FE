import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components'
import { connect } from 'react-redux'
import { filteredSearch, fetchUsers, finalSearchResults } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { fetchUserInfo } from '../../actions'
import { Form, Input, Header, Label, List, Loader, Icon, Select, Button, Dropdown } from 'semantic-ui-react'
import { CSVLink } from 'react-csv'
import _ from 'lodash'

import './zalandoSearch.css'

class ZalandoSearch extends Component {


  constructor(props) {
    super(props)

    this.state = {
      search: '',
      brand: '',
      sortname: null,
      sortsku: null,
      sortcategories: null,
      sortscore: null,
      sortenvironment: null,
      sortlabour: null,
      sortanimal: null,
      filter: {filters: {}, sort: {}},
      filterOptions: ['sku', 'categories', 'score', 'environment', 'labour', 'animal'],
      sortOptions: ['name', 'score', 'environment', 'labour', 'animal', 'categories', 'sku'],
      filteredArr: [],
      renderFilteredArr: [],
      results: [],
      searchResults: [],
      sku: [],
      categories: [],
      score: [],
      environment: [],
      labour: [],
      animal: [],
      searchApplied: false,
      filterApplied: false,
      showPages: 19,
    }
    this.handleSearch=this.handleSearch.bind(this)
    this.handleFilter=this.handleFilter.bind(this)
    this.handleSort=this.handleSort.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleClear=this.handleClear.bind(this)
    this.handleChip=this.handleChip.bind(this)
    this.handleShowMore=this.handleShowMore.bind(this)
  }

  componentWillMount() {
    if(this.props.searchResults[0]) {
      this.setState({results: this.props.searchResults})
    } else {
      this.props.filteredSearch()
      this.setState({isLoading: true})
    }
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.zolando !== this.props.zolando) {
      if(!nextProps.zolando.brands) {
        this.setState({
          results: _.map(nextProps.zolando, val => {
            return {
              Id: val.id,
              Name: val.name,
              Website: val.website,
              'Overall Score': val.score,
              'Score Out Of 5': val.dots,
              Label: val.label,
              Environment: val.environment.label,
              Labour: val.labour.label,
              Animal: val.animal.label,
              Categories: val.categories,
              Sku: val.sku,
              Headquarters: val.headquarters,
            }
          }),
          isLoading: false,
        })
      } else {
        this.setState({
          results: _.map(nextProps.zolando.brands, val => {
            return {
              Id: val.id,
              Name: val.name,
              Website: val.website,
              'Overall Score': val.score,
              'Score Out Of 5': val.dots,
              Label: val.label,
              Environment: val.environment.label,
              Labour: val.labour.label,
              Animal: val.animal.label,
              Categories: val.categories,
              Sku: val.sku,
              Headquarters: val.headquarters,
            }
          }),
          isLoading: false,
        })
      }
    }
  }

  componentWillUnmount() {
    this.state.searchApplied ? this.props.finalSearchResults(this.state.searchResults) : this.props.finalSearchResults(this.state.results)
  }

  handleFilter(event, { value, name }) {
    event.preventDefault()
    Promise.resolve(Object.assign(this.state.filter.filters, {[name]: value }))
      .then(() => {
        if(this.state.filter.filters[name].length <= 0) {
          delete this.state.filter.filters[name]
        }
      })
    this.setState({[name]: value, filterApplied: false})
  }

  handleChip(event) {
    event.preventDefault()
    this.setState({filteredArr: this.state.filteredArr.filter(val => val !== event.target.value)})
  }

  handleSort(event) {
    event.preventDefault()
    this.state.sortOptions.map(opt => {
      if(event.target.name !== opt) {
        this.setState({[`sort${opt}`]: null})
      }
    })
    if(!this.state[`sort${event.target.name}`]) {
      Promise.resolve(this.setState({isLoading: true, [`sort${event.target.name}`]: 'desc'}))
        .then(Object.assign(this.state.filter.sort, { key: event.target.name, order: 'desc'}))
        .then(this.props.filteredSearch(this.state.filter))
    } else if(this.state[`sort${event.target.name}`] === 'desc') {
      Promise.resolve(this.setState({isLoading: true, [`sort${event.target.name}`]: 'asc'}))
        .then(Object.assign(this.state.filter.sort, { key: event.target.name, order: 'asc'}))
        .then(this.props.filteredSearch(this.state.filter))
    } else {
      this.props.filteredSearch()
      this.setState({isLoading: true, [`sort${event.target.name}`]: null})
      Object.assign(this.state.filter.sort, { key: event.target.name, order: null})
    }
  }

  handleSearch(event, { value }) {
    event.preventDefault()
    let searchArr = []
    Promise.resolve(
      this.state.results.map(brand => {
        if(brand.Name.toLowerCase().includes(value.toLowerCase())) {
          searchArr.push({
            Id: brand.Id,
            Name: brand.Name,
            Website: brand.Website,
            'Overall Score': brand['Overall Score'],
            Label: brand.Label,
            Environment: brand.Environment,
            Labour: brand.Labour,
            Animal: brand.Animal,
            Categories: brand.Categories,
            'Score Out Of 5': brand['Score Out Of 5'],
            Headquarters: brand.Headquarters,
            Sku: brand.Sku,
          })
        }
      })
    ).then(this.setState({searchApplied: value.length >= 2 ? true : false, searchResults: value.length >= 2 ? searchArr : this.state.results}))
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({renderFilteredArr: this.state.filteredArr, filterApplied: true})
    this.props.filteredSearch(this.state.filter)
  }

  handleClear(event) {
    this.setState({isLoading: true, filterApplied: false, filteredArr: [], renderFilteredArr: [], filter: {filters: {}, sort: {}}})
    this.state.filterOptions.map(val => this.setState({[val]: []}))
    this.props.filteredSearch()
  }

  capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
  }

  renderSortButtons() {
    return this.state.sortOptions.map(val => {
      return (
        <div key={val} className='sort'><button className={this.state[`sort${val}`] ? 'sort-active' : 'sort-inactive'} name={val} onClick={this.handleSort}>{val === 'score' ? 'Overall Score' : this.capitalize(val)} <Icon name={!this.state[`sort${val}`] || this.state[`sort${val }`] === 'desc' ? 'arrow down' : 'arrow up'}/></button></div>
      )
    })
  }

  handleShowMore() {
    this.setState({showPages: this.state.showPages += 20})
  }

  checkNumber(n) {
    if(n % 2 === 0) {
      return 'even'
    } else {
      return 'odd'
    }
  }

  populateRender(brand, index) {
    return(
      <Link key={brand.Id} to={`/zalandoBrandPage/${brand.Id}`}>
        <div className={this.checkNumber(index) === 'even' ? 'filtered-items even' : 'filtered-items odd'} Id={brand.Id}>
          <div>
            <p>{brand.Name}</p>
            <p>{brand.Headquarters}</p>
            <p name='brandWebsite' className='brand-name'>View Brand Details</p>
          </div>
          <div>
            <p>
              {brand['Score Out Of 5'] >= 1 ? <Icon color='teal' name='circle'/> : <Icon color='grey' name='circle thin' />}
              {brand['Score Out Of 5'] >= 2 ? <Icon color='teal' name='circle'/> : <Icon color='grey' name='circle thin' />}
              {brand['Score Out Of 5'] >= 3 ? <Icon color='teal' name='circle'/> : <Icon color='grey' name='circle thin' />}
              {brand['Score Out Of 5'] >= 4 ? <Icon color='teal' name='circle'/> : <Icon color='grey' name='circle thin' />}
              {brand['Score Out Of 5'] >= 5 ? <Icon color='teal' name='circle'/> : <Icon color='grey' name='circle thin' />}
              {}
            </p>
            <p>{brand.Label}</p>
            <p>{' '}</p>
          </div>
          <div>
            <p></p>
            <p>{brand.Environment}</p>
            <p></p>
          </div>
          <div>{brand.Labour}</div>
          <div>{brand.Animal}</div>
          <div>{brand.Categories}</div>
          <div>{brand.Sku}</div>
        </div>
      </Link>
    )
  }

  renderResults() {
    if(this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if(this.state.searchApplied) {
      return _.map(this.state.searchResults, (brand, index) => {
        return this.populateRender(brand, index)
      })
    } else {
      return _.map(this.state.results, (brand, index)=> {
        if(this.state.results.indexOf(brand) <= this.state.showPages) {
          return this.populateRender(brand, index)
        }
      })
    }
  }

  render() {
    const state = this.state
    console.log('props', this.props.zolando)
    console.log('state', this.state)
    return (
      <div className='zolando-container'>
        <div className='search-bar-container'>
          <div className='search-bar'>
            <Form.Field>
              <Input
                placeholder='Search Brands'
                onChange={this.handleSearch}
                icon='search'
              />
            </Form.Field>
          </div>
        </div>
        <Form className='zolando-filters'>
          <div><h4>Filter</h4></div>
          <Form.Field>
            <Select
              name='score'
              placeholder='Overall Score'
              onChange={this.handleFilter}
              text='Overall Score'
              selection
              compact
              selectOnNavigation={false}
              multiple
              value={this.state.score}
              options={[
                { key: 'it\'s a start', value: 'it\'s a start', text: 'it\'s a start'},
                { key: 'good', value: 'good', text: 'good'},
                { key: 'great', value: 'great', text: 'great'},
              ]}
            />
          </Form.Field>
          <Form.Field>
            <Select
              name='environment'
              placeholder='Environment'
              onChange={this.handleFilter}
              text='Environment'
              selection
              compact
              selectOnNavigation={false}
              multiple
              value={this.state.environment}
              options={[
                { key: 'very poor', value: 'very poor', text: 'very poor'},
                { key: 'not good enough', value: 'not good enough', text: 'not good enough'},
                { key: 'it\'s a start', value: 'it\'s a start', text: 'it\'s a start'},
                { key: 'good', value: 'good', text: 'good'},
                { key: 'great', value: 'great', text: 'great'},
              ]}
            />
          </Form.Field>
          <Form.Field>
            <Select
              name='labour'
              placeholder='Labour'
              onChange={this.handleFilter}
              text='Labour'
              selection
              compact
              selectOnNavigation={false}
              multiple
              value={this.state.labour}
              options={[
                { key: 'very poor', value: 'very poor', text: 'very poor'},
                { key: 'not good enough', value: 'not good enough', text: 'not good enough'},
                { key: 'it\'s a start', value: 'it\'s a start', text: 'it\'s a start'},
                { key: 'good', value: 'good', text: 'good'},
                { key: 'great', value: 'great', text: 'great'},
              ]}
            />
          </Form.Field>
          <Form.Field>
            <Select
              name='animal'
              placeholder='Animal'
              onChange={this.handleFilter}
              text='Animal'
              selection
              compact
              selectOnNavigation={false}
              multiple
              value={this.state.animal}
              options={[
                { key: 'very poor', value: 'very poor', text: 'very poor'},
                { key: 'not good enough', value: 'not good enough', text: 'not good enough'},
                { key: 'it\'s a start', value: 'it\'s a start', text: 'it\'s a start'},
                { key: 'good', value: 'good', text: 'good'},
                { key: 'great', value: 'great', text: 'great'},
              ]}
            />
          </Form.Field>
          <Form.Field>
            <Select
              name='categories'
              placeholder='Categories'
              onChange={this.handleFilter}
              text='Categories'
              selection
              compact
              selectOnNavigation={false}
              multiple
              value={this.state.categories}
              options={[
                { key: 'menswear', value: 'menswear', text: 'menswear'},
                { key: 'womenswear', value: 'womenswear', text: 'womenswear'},
                { key: 'basics', value: 'basics', text: 'basics'},
                { key: 'designer', value: 'designer', text: 'designer'},
                { key: 'underwear', value: 'underwear', text: 'underwear'},
                { key: 'shoes', value: 'shoes', text: 'shoes'},
                { key: 'bags', value: 'bags', text: 'bags'},
                { key: 'fitness', value: 'fitness', text: 'fitness'},
                { key: 'outdoor', value: 'outdoor', text: 'outdoor'},
                { key: 'accessories', value: 'accessories', text: 'accessories'},
                { key: 'maternity', value: 'maternity', text: 'maternity'},
                { key: 'plus', value: 'plus', text: 'plus'},

              ]}
            />
          </Form.Field>
          <Form.Field>
            <Select
              name='sku'
              placeholder='SKU'
              onChange={this.handleFilter}
              selectOnNavigation={false}
              multiple
              compact
              value={this.state.sku}
              text='SKU'
              options={[
                { key: '<50', value: '<50', text: '<50'},
                { key: '50-99', value: '50-99', text: '50-99'},
                { key: '100-249', value: '100-249', text: '100-249'},
                { key: '250-499', value: '250-499', text: '250-499'},
                { key: '>500', value: '>500', text: '>500'},
              ]}
            />
          </Form.Field>
          <div>{!state.filterApplied ? <button onClick={this.handleSubmit}>Apply</button> : <p className='clear' onClick={this.handleClear}>Clear All</p>}</div>
        </Form>
        <div className='filtered-list'>
          <div className='excel'><CSVLink data={state.searchResults.length > 0 ? state.searchResults : state.results}><button>Export to Excel <Icon name='file excel outline' /></button></CSVLink></div>
          <p className='filter-text'>{state.filterApplied ? 'Filter Applied!' : ''}</p>

          <div className='sort-buttons'>{this.renderSortButtons()}</div>
          {this.renderResults()}
          {state.searchApplied && state.searchResults.length <= 0 ? <p className='no-results'>No Results Found</p> : ''}
          {this.state.results.length <= state.showPages || state.searchApplied ? '' : <button onClick={this.handleShowMore}>Show More</button>}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {searchResults: state.zalandoSearchResults, zolando: state.zolando, state}
}

export default connect(mapStateToProps, { filteredSearch, finalSearchResults })( ZalandoSearch )
