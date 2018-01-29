import { put, takeEvery, all } from 'redux-saga/effects'

import { FETCH_PERSON, receivePerson, requestPerson } from '../actions/person'
import { fetchPerson } from '../api/person'

export function * fetchPersonSaga () {
  yield put(requestPerson())
  const person = yield fetchPerson()
  yield put(receivePerson(person))
}

export function * watchPerson () {
  yield takeEvery(FETCH_PERSON, fetchPersonSaga)
}

export default function * saga () {
  yield all([
    watchPerson()
  ])
}
