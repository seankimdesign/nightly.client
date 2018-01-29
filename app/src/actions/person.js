import * as _ from '../utility/'

export const FETCH_PERSON = 'FETCH_PERSON'
export const REQUEST_PERSON = 'REQUEST_PERSON'
export const RECEIVE_PERSON = 'RECEIVE_PERSON'
export const FAILED_PERSON = 'FAILED_PERSON'

export const fetchPerson = () => ({
  type: FETCH_PERSON
})

export const requestPerson = () => ({
  type: REQUEST_PERSON
})

export const receivePerson = (person) => ({
  type: RECEIVE_PERSON,
  person: {
    name: _.combineNames(person.name),
    picture: person.picture.large
  }
})
