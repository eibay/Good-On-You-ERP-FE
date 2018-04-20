import { SEARCH_RESULTS } from '../actions'
import _ from 'lodash'


export default function(state = {}, action) {
  switch (action.type) {
  case SEARCH_RESULTS:
    if (!action.error) {
      sessionStorage.setItem('searchResults', JSON.stringify(action.payload))
      return action.payload
    }
    return {error: action.error}
  default:
    return state
  }
}
