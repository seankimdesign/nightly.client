import React from 'react'

import BlockLink from 'Root/components/BlockLink'
import style from './TopNavigationStyle'

export default (props) => {
  return (
    <BlockLink noBorder {...props} {...style.topNavigationLinkAttributes} />
  )
}
