import React from 'react'
import glamorous from 'glamorous'

import ButtonLink from './ButtonLink'
import style from './ButtonStyle'

export default (props) => {
  if (props.asLink) return <ButtonLink {...props} />
  const Button = glamorous.button(style.ButtonWrapper, style.ButtonProps)
  return <Button {...props} />
}
