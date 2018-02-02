import React from 'react'
import glamorous from 'glamorous'

import svgLogoBold from 'Shared/svg/logo-bold.svg'
import headerStyle from './HeaderStyle'

const HeaderWrapper = glamorous.header(headerStyle.headerWrapper)
const HeaderLogo = glamorous.header(headerStyle.headerLogo)

// TODO: Figure out a way to use SVG in React
console.log(svgLogoBold)

export default (prop) => (
  <HeaderWrapper>
    <HeaderLogo>
      <div>Place SVG Logo Here</div>
    </HeaderLogo>
    <div>
      {prop.children}
    </div>
  </HeaderWrapper>
)
