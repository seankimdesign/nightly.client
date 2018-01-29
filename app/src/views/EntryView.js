import { connect } from 'react-redux'

import { fetchPerson } from '../actions/person'
import EntryPage from '../pages/EntryPage'

const mapState = (state) => ({
  person: state.person
})

const mapDispatch = (dispatch) => ({
  doFetchPerson: () => {
    dispatch(fetchPerson())
  }
})

const EntryView = connect(
    mapState,
    mapDispatch
)(EntryPage)

export default EntryView
