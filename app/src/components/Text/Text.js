import React from 'react'
import glamorous from 'glamorous'

import style from './TextStyle'

export default (props) => {
  const Text = glamorous.p(style.textBase, style.textProps)
  return <Text {...props} />
}
