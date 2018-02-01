import { connect } from 'react-redux'

import { fetchPerson } from 'Root/actions/person'
import EntryPage from './EntryPage'

const mapState = (state) => ({
  person: state.person
})

const mapDispatch = (dispatch) => ({
  doFetchPerson: () => {
    dispatch(fetchPerson())
  }
})

const EntryContainer = connect(
  mapState,
  mapDispatch
)(EntryPage)

export default EntryContainer
