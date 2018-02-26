import React from 'react'
import glamorous from 'glamorous'

import style from './PageStyle'

const PageWrapper = glamorous.section(style.pageWrapper)

export default (props) => {
  const PageInner = props.column
    ? glamorous.div(style.pageInnerColumn)
    : glamorous.div(style.pageInnerRow)
  return (
    <PageWrapper>
      <PageInner>
        {props.children}
      </PageInner>
    </PageWrapper>
  )
}
