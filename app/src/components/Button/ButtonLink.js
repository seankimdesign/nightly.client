import React from 'react'
import Link from 'Root/components/Link'
import glamorous from 'glamorous'

import style from './ButtonStyle'

export default (props) => {
  const {url, padding, children, ...wrapperProps} = props
  const ButtonWrapper = glamorous.div(style.ButtonWrapper, style.ButtonProps)
  return (
    <ButtonWrapper {...wrapperProps}>
      <Link padding={padding} to={props.url}>{props.children}</Link>
    </ButtonWrapper>
  )
}
