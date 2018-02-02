import rawStyles from 'Shared/css/_config.scss'
import util from 'Shared/js/util'

const importedStyles = util.convertStyles(rawStyles)
const appStyles = util.convertStyles({
  fontBaseSize: '14px',
  fontHeadingSize: '32px',
  fontSubheadingSize: '24px',
  fontSmallerSize: '12px'
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

export default {...importedStyles, ...appStyles, premade}
