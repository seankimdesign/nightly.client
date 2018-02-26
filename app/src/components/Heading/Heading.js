import React from 'react'
import glamorous from 'glamorous'

import style from './HeadingStyle'

export default (props) => {
  let element = glamorous.H1
  switch (props.element) {
    case 'h2':
      element = glamorous.H2
      break
    case 'h3':
      element = glamorous.H3
      break
    case 'h4':
      element = glamorous.H4
      break
  }
  const Heading = glamorous(element)(style.headingBase, style.headingProps)
  return <Heading {...props} />
}
