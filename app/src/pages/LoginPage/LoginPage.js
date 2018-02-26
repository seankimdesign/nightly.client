import React, { Component } from 'react'

import Button from 'Root/components/Button'
import Heading from 'Root/components/Heading'
import Page from 'Root/components/Page'

class LoginPage extends Component {
  render () {
    const loading = this.props.account.fetching && <p>loading....</p>
    return (
      <Page column>
        <Heading element='h2'>Login Page</Heading>
        <Button onClick={this.props.fetchAccount}>Fetch Account</Button>
        {loading}
      </Page>
    )
  }
}

export default LoginPage
