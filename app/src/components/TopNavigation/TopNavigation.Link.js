import React from 'react'

import Button from 'Root/components/Button'
import style from './TopNavigationStyle'

export default (props) => {
  return (
    <Button asLink noBorder {...props} {...style.topNavigationLinkAttributes} />
  )
}
