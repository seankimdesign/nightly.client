import { put, takeEvery } from 'redux-saga/effects'

import { FETCH_ACCOUNT, receiveAccount, requestAccount, failedAccount } from 'Root/actions/account'
import { fetchAccount } from 'Root/api/account'
import util from 'Root/utility'

function * fetchAccountSaga () {
  yield put(requestAccount())
  const response = yield fetchAccount()
  const payload = yield util.decodeAccountPayload(response.access_token)
  if (payload) {
    yield put(receiveAccount({
      ...payload,
      access_token: response.access_token,
      refresh_token: response.refresh_token
    }))
  } else {
    yield put(failedAccount(payload))
  }
}

export default function * () {
  yield takeEvery(FETCH_ACCOUNT, fetchAccountSaga)
}
