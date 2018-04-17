import { FETCH_CAUSE } from '../actions/cause'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_CAUSE:
    if (!action.error) {
      return action.payload.data.data
    }
    return {error: action.error}
  default:
    return state
  }
}
