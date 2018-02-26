import { connect } from 'react-redux'

import { fetchAccount } from 'Root/actions/account'
import LoginPage from './LoginPage'

const mapState = (state) => ({
  account: state.account
})

const mapDispatch = {
  fetchAccount
}

const LoginContainer = connect(
  mapState,
  mapDispatch
)(LoginPage)

export default LoginContainer
