import styles from 'Root/styles'

export default {
  linkBase: {
    fontSize: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
    ':hover, :visited, :active': {color: 'inherit'}
  },
  linkProps: props => ({
    display: props.block ? 'block' : 'inline-block',
    textDecoration: props.underline ? 'underline' : 'none',
    fontWeight: props.bold ? 700 : 400,
    textAlign: props.align || 'left',
    padding: props.padding || styles.fn.getSpacing(2)
  })
}
