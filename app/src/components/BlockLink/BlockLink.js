import React from 'react'
import Link from 'Root/components/Link'
import glamorous from 'glamorous'

import style from './BlockLinkStyle'

export default (props) => {
  const {url, children, ...wrapperProps} = props
  const stylize = props.stylize || {}
  const BlockLinkWrapper = glamorous.div(style.blockLinkWrapper, style.blockLinkProps, stylize)
  return (
    <BlockLinkWrapper {...wrapperProps}>
      <Link to={props.url}>{props.children}</Link>
    </BlockLinkWrapper>
  )
}
