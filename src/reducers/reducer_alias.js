import { FETCH_ALIAS, DELETE_ALIAS } from '../actions/alias'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_ALIAS:
    if (!action.error) {
      return action.payload.data.data
    }
    return {error: action.error}
  case DELETE_ALIAS:
    if (!action.error) {
      return _.omit(state, action.payload.data.alias)
    }
    return {error: action.error}
  default:
    return state
  }
}