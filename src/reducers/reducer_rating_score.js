import {
  FETCH_RATING_SCORE,
} from '../actions/rating'
import _ from 'lodash'

//fetches all questions for brand and maps through each unique key value returning the brand and answer tied to the question
export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_RATING_SCORE:
    if (!action.error) {
      return action.payload.data.data
    }
    return {error: action.error}
  default:
    return state
  }
}
