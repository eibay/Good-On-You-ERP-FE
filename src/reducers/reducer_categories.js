import { FETCH_CATEGORY, UPDATE_CATEGORY } from '../actions/category'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_CATEGORY:
    if (!action.error) {
      return action.payload.data.data
    }
    return {error: action.error}
  // case UPDATE_CATEGORY:
  //   if (!action.error) {
  //     console.log('update, category', action.payload)
  //     return {...state, [action.payload]}
  //   }
  //   return {error: action.error}
  default:
    return state
  }
}
