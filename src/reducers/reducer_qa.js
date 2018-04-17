import {FETCH_RATING,FETCH_RATING_SCORE} from '../actions/rating'
import { FETCH_GENERAL } from '../actions'
import _ from 'lodash'

//fetches all questions for brand and maps through each unique key value returning the brand and answer tied to the question
export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_GENERAL:
    if (!action.error) {
      sessionStorage.setItem('website', action.payload.data.website)
      sessionStorage.setItem('name', action.payload.data.name)
      return action.payload.data
    }
    return {error: action.error}
  case FETCH_RATING:
    if (!action.error) {
      return action.payload.data.data
    }
    return {error: action.error}
  default:
    return state
  }
}
