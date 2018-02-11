import { connect } from 'react-redux'

import { fetchAccount } from 'Root/actions/account'
import EntryPage from './EntryPage'

const mapState = (state) => ({
  account: state.account
})

const mapDispatch = {
  fetchAccount
}

const EntryContainer = connect(
  mapState,
  mapDispatch
)(EntryPage)

export default EntryContainer
