import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { brandsHomePage } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { Loader, Form, Icon } from 'semantic-ui-react'
import _ from 'lodash'
import './zalandoBrandPage.css'
import { Price, Causes, Dots, url, Size } from '../../components'


class ZalandoBrandPage extends Component {


  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }

    this.brandId=this.props.match.params.id
  }

  componentWillMount() {
    this.props.brandsHomePage(this.brandId)
    this.setState({isLoading: true})
  }

  componentWillReceiveProps(nextProps) {
    let error = nextProps.zolando.error
    if(nextProps.searchResults !== this.props.searchResults) {
      _.map(nextProps.searchResults, (val, i) => {
        if(val.Id == this.brandId) {
          this.setState({
            currentBrandIndex: nextProps.searchResults.indexOf(val),
            prevBrand: nextProps.searchResults.indexOf(val) !== 0 ? nextProps.searchResults[nextProps.searchResults.indexOf(val) - 1].Id : null,
            nextBrand: nextProps.searchResults.length > nextProps.searchResults.indexOf(val + 1) ? nextProps.searchResults[nextProps.searchResults.indexOf(val) + 1].Id : null,
          })
        }
        
      })
    }
    if(nextProps.zolando !== this.props.zolando) {
      if(error) {
        if(error.message === 'Access Denied!') {
          this.props.history.push('/zalandoSearch')
        }
      }
      if(!nextProps.searchResults[0]) {   
        this.props.history.push('/zalandoSearch')
      }
      this.setState({
        isLoading: false,
        results: nextProps.zolando,
      })
      
    }
  }

  // renderBrandCover() {
  //   if (this.state.isLoading === true) {
  //     return (<Loader active inline='centered' />)
  //   } else if (!this.props.zolando) {
  //     return (
  //       <div> loading... </div>
  //     )
  //   } else {
  //     const zcover = this.state.results.cover
  //     console.log('cover', zcover)
      
  //     return (
  //       <div className='brand-cover'>
  //         { zcover ? <img className='brand-cover-image' src={zcover} /> : <img src="https://picsum.photos/1500/300" /> }
  //       </div>
  //     )
  //   }
  // }

  renderTotalScore() {
    const zprops = this.props.zolando
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else {
      return (
        <span> {zprops.ratings.score} / {zprops.ratings.max_score} </span>
      )
    }
  }

  renderRatings() {
    const zprops = this.props.zolando
    if (this.state.isLoading === true ){
      return ( <Loader active inline='centered'/>)
    } else {
      return _.map(zprops.ratings.headlines, (headline, index) => {
        const name = (headline.name).replace(/\b\w/g, function (l) { return l.toUpperCase() })
        return (
          <li key={index}><span>{name}</span><span>{headline.score} / {headline.max_score}</span><span>{headline.label}</span></li>
        )
      })
    }
  }

  renderDate() {
    if (this.state.isLoading === true) {
      return( <Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      return(
        <h5> loading... </h5>
      )
    } else {
      let date = (this.props.zolando.last_updated)
      date = date.substring(0,10)
      return (
        <div><span>Last updated {date}</span></div>
      )
    }
  }

  renderSummary() {
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      return (
        <h5> loading... </h5>
      )
    } else {
      return (
        <div>
          {(this.props.zolando.summary ) ? this.props.zolando.summary.split('<p>').map(item => <p>{item}<br/></p>) :
            <p>Lorem ipsum dolor sit amet, dicat tation intellegat pro te. Error mucius scaevola mel ea,
            inani epicurei incorrupte vel et. <br /> Ad dolorum suscipiantur mea, ad eam quando oportere euripidis.
            Cu soleat euismod moderatius vim. At quo alii inani moderatius, sea ut omnium conceptam.<br />
            Lorem ipsum dolor sit amet, dicat tation intellegat pro te. Error mucius scaevola mel ea,
            inani epicurei incorrupte vel et. <br /> Ad dolorum suscipiantur mea, ad eam quando oportere euripidis.
            Cu soleat euismod moderatius vim. At quo alii inani moderatius, sea ut omnium conceptam.
            </p>}
        </div>
      )
    }
  }

  renderDetails() {
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      return (
        <h5> loading... </h5>
      )
    } else {
      let ratings_label = this.props.zolando.ratings.label
      let ratings_dots = this.props.zolando.ratings.dots
      let sku = this.props.zolando.sku
      let price = this.props.zolando.price
      let parent_company = this.props.zolando.parent_company
      let size  = this.props.zolando.size
      let contact_name = this.props.zolando.contact.name
      let contact_email = this.props.zolando.contact.email
      let categories = (this.props.zolando.categories).join(', ')
      let contact_mail_to = 'mailto:' + contact_email
      return (
        <ul className='table-details'>
          <li className='details-row'><span className='item'>Overall Rating<span><Icon name='question circle' /></span></span><span className='item'>{ratings_label}<Dots dots={ratings_dots}/></span></li>
          {(categories) ? <li className='details-row'><span className='item'>Categories<span><Icon name='question circle' /></span> </span><span className='item'>{categories}</span></li> : null }
          {(sku) ? <li className='details-row'><span className='item'>SKUs<span><Icon name='question circle' /></span></span><span className='item'>{sku}</span></li> : null }
          {(price) ? <li className='details-row'><span className='item'>Price<span><Icon name='question circle' /></span></span><span className='item'><Price price={price} /></span></li> : null }
          {(parent_company) ? <li className='details-row'><span className='item'>Parent Company<span><Icon name='question circle' /></span></span><span className='item'>{parent_company}</span></li> : null }
          {(size) ? <li className='details-row'><span className='item'>Size<span><Icon name='question circle' /></span></span><span className='item'><Size size={size} /></span></li> : null }
          {(contact_name) ? <li className='details-row'><span className='item'>Contact Name<span><Icon name='question circle' /></span></span><span className='item'>{contact_name}</span></li> : null }
          {(contact_email) ? <li className='details-row'><span className='item'>Contact Email<span><Icon name='question circle' /></span></span><span className='item '><a className='contact-email' href={contact_mail_to}>{ contact_email }</a></span></li>  : null }
        </ul>
      )
    }
  }

  renderLabel() {
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      return (
        <h5> loading... </h5>
      )
    } else {
      let ratings_label = this.props.zolando.ratings.label
      return (
        <span>{ratings_label}</span>
      )
    }
  }

  renderBrandSummary() {
    const zprops = this.props.zolando
    return (
      <div>
        <div className='card-title'>Details</div>
        <div className='card-content'> {this.renderSummary()}</div>
        <div className='cause'><Causes causes={zprops.causes} /></div>
      </div>
    )
  }

  //handles the next/previous brand navigation.  Based on the index of the current brand in search results, 
  //will navigate to the correct brand by adding/subtracting the index accordingly.
  handleNav(id, indx, name) {
    console.log('nav', id, indx, name)
    if(name === 'prev') {
      this.setState({
        currentBrandIndex: this.state.currentBrandIndex - 1,
        prevBrand: indx !== 1 ? this.props.searchResults[indx - 2].Id : null,
        nextBrand: this.props.searchResults[indx].Id,
      })
    } else if(name === 'next') {
      this.setState({
        currentBrandIndex: this.state.currentBrandIndex + 1,
        prevBrand: this.props.searchResults[indx].Id,
        nextBrand: indx !== this.props.searchResults.length - 2 ? this.props.searchResults[indx + 2].Id : null,
      })
    }
    this.props.brandsHomePage(id)
    this.props.history.push(`/zalandoBrandPage/${this.state.prevBrand}`)
  }

  render() {
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      return (
        <h5> loading... </h5>
      )
    } else {
      const zprops = this.props.zolando
      let ratings_label = this.props.zolando.ratings.label
      let ratings_dots = this.props.zolando.ratings.dots
      console.log('zprops', this.props.zolando)
      console.log('searchProps', this.props.searchResults)
      console.log('zstate', this.state)

      const image = (!this.state.results.cover ? 'https://picsum.photos/1500/300' : this.state.results.cover )

      const coverStyle = {
        color: 'white',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + image + ')',
        WebkitTransition: 'all', // note the capital 'W' here
        msTransition: 'all', // 'ms' is the only lowercase vendor prefix
      }

      return (
        <div className='brand-container'>
          <div className='brand-cover-container'>
            <div style={coverStyle}></div>
          </div>
          <div className='cover-overlay'><div className='brand-name-container'><p>Search Results > {zprops.name}</p></div></div>

          <div className='brand-page'>
            <div className='brand-nav-container'>
              <div className='prev-brand'> 
                {this.state.prevBrand ? 
                  <button onClick={() => this.handleNav(this.state.prevBrand, this.state.currentBrandIndex, 'prev')} className='nav-button'>
                    <Icon name='chevron left'/> 
                    View previous brand
                  </button> :
                  ''}
              </div>
              <div className='back-to-search'><Link to='/zalandoSearch'>Back to Search Results</Link></div>
              <div className='next-brand'>
                {this.state.nextBrand ? 
                  <button className='nav-button' onClick={() => this.handleNav(this.state.nextBrand, this.state.currentBrandIndex, 'next')}>
                    View next brand 
                    <Icon name='chevron right' />
                  </button> :
                  ''}
              </div>
            </div>
            <div className='brand-card'>
              <div className='brand-card-home'>
                <div className='brand-home'>
                  <img src={zprops.logo} className='brand-logo' />
                  <div className='brand-title'>{zprops.name}</div>
                  <p className='brand-hq'>{(zprops.headquarters) ? zprops.headquarters : 'Headquarters'} / <a href={zprops.website && zprops.website.includes('http') ?  zprops.website : `http://${zprops.website}`} target='_blank' className='web'>Website</a></p>
                  <p className='brand-sentence'>{zprops.sentence}</p>
                </div>
              </div>

              <div className='brand-details'>
                <div>{this.renderDetails()}</div>
              </div>
            </div>

            <div className='brand-card'>
              <div className='brand-ratings'>
                <div className='card-title'>Ratings</div>
                <div className='card-content'>
                  <ul className='table-ratings'>
                    <li>
                      <span> Total Score </span>
                      <span>{this.renderTotalScore()}</span>
                      <span>
                        {this.renderLabel()} <span> <Dots dots={ratings_dots} /></span>
                      </span>
                    </li>
                    {this.renderRatings()}
                  </ul>
                </div>
              </div>
            </div>

            <div className='brand-card'>
              <div>{this.renderBrandSummary()}</div>
            </div>
            <div className='last-update'><i>{this.renderDate()}</i></div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {zolando: state.zolando, searchResults: state.zalandoSearchResults, state}
}

export default connect(mapStateToProps, { brandsHomePage })( ZalandoBrandPage )
