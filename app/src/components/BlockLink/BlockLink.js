import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'

const BlockLinkWrapper = glamorous.div({
  fontSize: '16px',
  padding: '6px 8px',
  borderRadius: '3px',
  border: '1px solid #999'
})

export default (prop) => (
  <BlockLinkWrapper>
    <Link to={prop.url}>{prop.text}</Link>
  </BlockLinkWrapper>
)
