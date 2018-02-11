import React from 'react'
import glamorous from 'glamorous'

import pageStyle from './PageStyle'

const PageWrapper = glamorous.section(pageStyle.pageWrapper)

export default (props) => {
  const PageInner = props.column
    ? glamorous.div(pageStyle.pageInnerColumn)
    : glamorous.div(pageStyle.pageInnerRow)
  return (
    <PageWrapper>
      <PageInner>
        {props.children}
      </PageInner>
    </PageWrapper>
  )
}
