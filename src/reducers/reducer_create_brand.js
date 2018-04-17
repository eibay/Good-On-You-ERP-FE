import { CREATE_BRAND, FETCH_BRAND_INFO} from '../actions'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'


export default function(state = {}, action) {
  switch (action.type) {
  case CREATE_BRAND:
    if (!action.error) {
      return action.payload
    }
    return {error: action.error}
  case FETCH_BRAND_INFO:
    if (!action.error) {
      sessionStorage.setItem('name', action.payload.data.name)
      sessionStorage.setItem('website', action.payload.data.website)
      return {...state, ...action.payload.data}
    }
    return {error: action.error}
  default:
    return state
  }
}
