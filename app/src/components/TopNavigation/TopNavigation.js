import React from 'react'
import BlockLink from 'Root/components/BlockLink'
import glamorous from 'glamorous'

const TopNavigationWrapper = glamorous.nav({
  display: 'flex',
  padding: '3px'
})

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
