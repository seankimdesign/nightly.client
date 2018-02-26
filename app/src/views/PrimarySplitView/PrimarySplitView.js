import React from 'react'
import glamorous from 'glamorous'
import { BrowserRouter as Router } from 'react-router-dom'

import primarySplitStyle from './PrimarySplitStyle'
import PrimarySplitRoutes from './PrimarySplitRoutes'
import Header from 'Root/components/Header'
import TopNavigation from 'Root/components/TopNavigation'

const PrimarySplitViewWrapper = glamorous.div(primarySplitStyle.primarySplitWrapper)

export default () => {
  return (
    <Router>
      <PrimarySplitViewWrapper>
        <Header>
          <TopNavigation>
            <TopNavigation.Link url='/'>
              Main
            </TopNavigation.Link>
            <TopNavigation.Link url='/write'>
              Write
            </TopNavigation.Link>
            <TopNavigation.Link url='/login'>
              Login
            </TopNavigation.Link>
          </TopNavigation>
        </Header>
        <PrimarySplitRoutes />
      </PrimarySplitViewWrapper>
    </Router>
  )
}
