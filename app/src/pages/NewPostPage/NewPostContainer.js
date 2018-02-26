import { connect } from 'react-redux'

import { fetchAccount } from 'Root/actions/account'
import NewPostPage from './NewPostPage'

const mapState = (state) => ({
  account: state.account
})

const mapDispatch = {
  fetchAccount
}

const NewPostContainer = connect(
  mapState,
  mapDispatch
)(NewPostPage)

export default NewPostContainer
