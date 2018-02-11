import React, { Component } from 'react'

import Page from 'Root/components/Page'

class EntryPage extends Component {
  render () {
    const loading = this.props.account.fetching && <p>loading....</p>
    return (
      <Page column>
        <h2>Entry Page</h2>
        <button onClick={this.props.fetchAccount}>Fetch Account</button>
        {loading}
      </Page>
    )
  }
}

export default EntryPage
