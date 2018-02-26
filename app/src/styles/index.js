import rawStyles from 'Shared/css/_config.scss'
import util from 'Shared/js/util'

// Base spacing unit in pixels
const BASE_SPACE = 4

const importedStyles = util.convertStyles(rawStyles)
const appStyles = util.convertStyles({
  fontBaseSize: '14px',
  fontMenuSize: '15px',
  fontHeadingSize: '32px',
  fontSubheadingSize: '24px',
  fontSmallerSize: '12px',
  roundedCorner: '3px'
})

const premade = {
  flexRowCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

const fn = {
  getBorder: (color, thickness = '1px') =>
    `${thickness} solid ${color}`,
  getSpacing: (multiples, horizontal) => {
    if (horizontal) return `${BASE_SPACE * multiples}px ${BASE_SPACE * horizontal}px`
    return `${BASE_SPACE * multiples}px`
  }
}

export default {...importedStyles, ...appStyles, premade, fn}
