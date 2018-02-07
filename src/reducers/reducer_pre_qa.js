import { FETCHALL_RATING, FETCHRAW_RATING } from '../actions/rating'
import { FETCHALL_CAUSE } from '../actions/cause'
import { FETCHALL_STYLES } from '../actions/style'
import { FETCHALL_CATEGORY } from '../actions/category'
import { FETCH_TERRITORY } from '../actions/retailer'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'


export default function(state = null, action) {
  switch (action.type) {
  case FETCHALL_STYLES:
    if (!action.error) {
      console.log('fetch all, styles', action.payload.data)
      return _.mapKeys(action.payload.data.data, 'tag')
    }
    return {error: action.error}
  case FETCHALL_CATEGORY:
    if (!action.error) {
      console.log('fetch, categories', action.payload.data)
      return _.mapKeys(action.payload.data.data, 'name')
    }
    return {error: action.error}
  case FETCH_TERRITORY:
    if (!action.error) {
      console.log('get, territory', action.payload.data.data)
      return action.payload.data.data
    }
    return {error: action.error}
  case FETCHALL_CAUSE:
    if (!action.error) {
      console.log('fetch all, cause', action.payload.data.data)
      return _.mapKeys(action.payload.data.data, 'id')
    }
    return {error: action.error}
  case FETCHALL_RATING:
    if (!action.error) {
      console.log('fetch all, rating', action.payload.data.data)
      return _.mapKeys(action.payload.data.data, 'name')
    }
    return {error: action.error}
  case FETCHRAW_RATING:
    if(!action.error) {
      console.log('raw rating', action.payload.data)
      return action.payload.data.data
    }
    return {error: action.error}
  default:
    return state
  }
}
