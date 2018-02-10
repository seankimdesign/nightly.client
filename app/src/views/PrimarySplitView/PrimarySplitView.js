import React from 'react'
import glamorous from 'glamorous'
import { BrowserRouter as Router } from 'react-router-dom'

import primarySplitStyle from './PrimarySplitStyle'
import PrimarySplitRoutes from './PrimarySplitRoutes'
import Header from 'Root/components/Header'
import TopNavigation from 'Root/components/TopNavigation'

const PrimarySplitViewWrapper = glamorous.div(primarySplitStyle.primarySplitWrapper)

export default () => {
  const links = [
    {
      text: 'Main',
      url: '/'
    },
    {
      text: 'Write',
      url: '/write'
    },
    {
      text: 'Login',
      url: '/login'
    }
  ]
  return (
    <Router>
      <PrimarySplitViewWrapper>
        <Header>
          <TopNavigation links={links} />
        </Header>
        <PrimarySplitRoutes />
      </PrimarySplitViewWrapper>
    </Router>
  )
}
