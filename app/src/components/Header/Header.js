import React from 'react'
import glamorous from 'glamorous'
import { Link } from 'react-router-dom'

import style from './HeaderStyle'
import svgLogoBold from 'Shared/svg/logo-bold.svg'
import SVGImage from 'Root/components/SVGImage'

const HeaderWrapper = glamorous.header(style.headerWrapper)
const HeaderLogoWrapper = glamorous.div(style.headerLogoWrapper)
const HeaderContentWrapper = glamorous.div(style.headerContentWrapper)

export default (prop) => (
  <HeaderWrapper>
    <HeaderLogoWrapper>
      <Link to='/'>
        <SVGImage id={svgLogoBold.id} {...style.headerLogoAttributes} />
      </Link>
    </HeaderLogoWrapper>
    <HeaderContentWrapper>
      {prop.children}
    </HeaderContentWrapper>
  </HeaderWrapper>
)
