import React from 'react'
import glamorous from 'glamorous'

import style from './TopNavigationStyle'
import Link from './TopNavigation.Link'

const TopNavigationWrapper = glamorous.nav(style.topNavigationWrapper)

const TopNavigation = (props) => {
  return (
    <TopNavigationWrapper>
      {props.children}
    </TopNavigationWrapper>
  )
}

TopNavigation.Link = Link

export default TopNavigation
