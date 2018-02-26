import { Link } from 'react-router-dom'
import glamorous from 'glamorous'

import style from './LinkStyle'

export default glamorous(Link)(style.linkBase, style.linkProps)
