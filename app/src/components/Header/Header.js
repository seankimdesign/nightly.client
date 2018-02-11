import React from 'react'
import glamorous from 'glamorous'
import { Link } from 'react-router-dom'

import headerStyle from './HeaderStyle'
import svgLogoBold from 'Shared/svg/logo-bold.svg'
import SVGImage from 'Root/components/SVGImage'

const HeaderWrapper = glamorous.header(headerStyle.headerWrapper)
const HeaderLogo = glamorous.div(headerStyle.headerLogoContainer)

export default (prop) => (
  <HeaderWrapper>
    <HeaderLogo>
      <Link to='/'>
        <SVGImage id={svgLogoBold.id} {...headerStyle.headerLogo} />
      </Link>
    </HeaderLogo>
    <div>
      {prop.children}
    </div>
  </HeaderWrapper>
)
