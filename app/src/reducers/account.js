import { RECEIVE_ACCOUNT, REQUEST_ACCOUNT, FAILED_ACCOUNT } from '../actions/account'

const defaultState = {
  username: null,
  name: null,
  email: null,
  groups: [],
  access_token: null,
  refresh_token: null,
  fetching: false,
  error: null
}

const person = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_ACCOUNT:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case RECEIVE_ACCOUNT:
      return {
        ...state,
        fetching: false,
        ...action.payload
      }
    case FAILED_ACCOUNT:
      return {
        ...state,
        fetching: false,
        ...action.payload
      }
    default:
      return state
  }
}

export default person
