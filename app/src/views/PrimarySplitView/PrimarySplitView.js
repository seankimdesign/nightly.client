import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import PrimarySplitViewWrapper from './PrimarySplitStyle'
import PrimarySplitRoutes from './PrimarySplitRoutes'
import TopNavigation from '../../components/TopNavigation'

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
        <TopNavigation links={links} />
        <PrimarySplitRoutes />
      </PrimarySplitViewWrapper>
    </Router>
  )
}
