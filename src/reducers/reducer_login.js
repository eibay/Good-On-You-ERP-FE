import { LOG_IN, LOG_OUT, FETCH_USER_INFO, AUTH_USER, AUTH_ERROR } from '../actions'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export default function(state = {}, action) {
  switch (action.type) {
  case LOG_IN:
    if (!action.error) {
      sessionStorage.setItem('jwt', action.payload.data.accessToken)
      return {...state, token: action.payload.data.accessToken}
    }
    return {error: action.error}
  case AUTH_USER:
    return {...state, token: action.payload}
  case AUTH_ERROR:
    return {...state, error: 'Username or Password is Incorrect'}
  case LOG_OUT:
    return {...state, token: null}
  case FETCH_USER_INFO:
    if (!action.error) {
      return {user: action.payload.data.data[0]}
    }
    return {error: action.error}
  default:
    return state
  }
}
