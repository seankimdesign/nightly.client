import React from 'react'
import glamorous from 'glamorous'

import BlockLink from 'Root/components/BlockLink'
import topNavigationStyle from './TopNavigationStyle'

const TopNavigationWrapper = glamorous.nav(topNavigationStyle.topNavigationWrapper)

export default (props) => {
  const links = props.links.map(link =>
    <BlockLink key={link.url} {...link} />
  )
  return (
    <TopNavigationWrapper>
      <div>This is a top nav</div>
      {links}
    </TopNavigationWrapper>
  )
}
