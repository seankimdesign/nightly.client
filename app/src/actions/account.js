export const FETCH_ACCOUNT = 'FETCH_ACCOUNT'
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT'
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT'
export const FAILED_ACCOUNT = 'FAILED_ACCOUNT'

export const fetchAccount = () => ({
  type: FETCH_ACCOUNT
})

export const requestAccount = () => ({
  type: REQUEST_ACCOUNT
})

export const receiveAccount = (payload) => ({
  type: RECEIVE_ACCOUNT,
  payload
})

export const failedAccount = (payload) => ({
  type: FAILED_ACCOUNT,
  payload
})
