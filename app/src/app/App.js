import React, {Component} from 'react'
import { Provider } from 'react-redux'

import store from './Store'
import EntryView from '../views/EntryView'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <EntryView />
      </Provider>
    )
  }
}

export default App
