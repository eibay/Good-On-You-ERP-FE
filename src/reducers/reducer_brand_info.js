import { BRAND_INFO } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case BRAND_INFO:
    return {...state, name: action.payload.name, website: action.payload.website}
  default:
    return state
  }
}
