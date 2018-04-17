import { UPLOAD_LOGO, FETCH_LOGO } from '../actions/image'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_LOGO:
    if (!action.error) {
      return action.payload.data.data
    }
    return {error: action.error}
  case UPLOAD_LOGO:
    if(!action.error) {
      return [...state, action.payload.data]
    }
    return {error: action.error}
  default:
    return state
  }
}
