import { FETCH_RETAILER } from '../actions/retailer'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_RETAILER:
    if (!action.error) {
      return action.payload.data.data
    }
    return {error: action.error}
  default:
    return state
  }
}
