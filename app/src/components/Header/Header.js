import React from 'react'
import glamorous from 'glamorous'

import headerStyle from './HeaderStyle'
import svgLogoBold from 'Shared/svg/logo-bold.svg'
import SVGImage from 'Root/components/SVGImage'

const HeaderWrapper = glamorous.header(headerStyle.headerWrapper)
const HeaderLogo = glamorous.header(headerStyle.headerLogoContainer)

export default (prop) => (
  <HeaderWrapper>
    <HeaderLogo>
      <SVGImage id={svgLogoBold.id} {...headerStyle.headerLogo} />
    </HeaderLogo>
    <div>
      {prop.children}
    </div>
  </HeaderWrapper>
)
