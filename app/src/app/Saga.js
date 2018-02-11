import { all } from 'redux-saga/effects'

import watchAccount from 'Root/api/accountSaga'

export default function * saga () {
  yield all([
    watchAccount()
  ])
}
