import { RECEIVE_PERSON, REQUEST_PERSON, FAILED_PERSON } from '../actions/person'

const defaultState = {name: null, picture: null, error: null, fetching: false}

const person = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_PERSON:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case RECEIVE_PERSON:
      return {
        ...state,
        fetching: false,
        ...action.person
      }
    case FAILED_PERSON:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    default:
      return state
  }
}

export default person
