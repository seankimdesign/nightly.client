import React, {Component} from 'react'
import { Provider } from 'react-redux'

import store from './Store'
import PrimarySplitView from 'Root/views/PrimarySplitView'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PrimarySplitView />
      </Provider>
    )
  }
}

export default App
