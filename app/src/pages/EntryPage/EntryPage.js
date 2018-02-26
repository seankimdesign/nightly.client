import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Heading from 'Root/components/Heading'
import Text from 'Root/components/Text'
import Page from 'Root/components/Page'

class EntryPage extends Component {
  render () {
    if (!this.props.account.username) {
      const redirectInfo = {
        pathname: '/login',
        state: {
          from: 'main',
          message: 'You muse first log in before accessing the main page'
        }
      }
      return <Redirect to={redirectInfo} />
    }
    return (
      <Page column>
        <Heading>Entry Page</Heading>
        <Text>I should already be logged in if I am seeing this page</Text>
      </Page>
    )
  }
}

export default EntryPage
