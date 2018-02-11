import React from 'react'
import glamorous from 'glamorous'

import pageStyle from './PageStyle'

const PageWrapper = glamorous.div(pageStyle.pageWrapper)

export default (props) => (
  <PageWrapper>
    {props.children}
  </PageWrapper>
)
