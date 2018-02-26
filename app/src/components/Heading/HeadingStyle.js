import styles from 'Root/styles'

export default {
  headingBase: {
    fontFamily: styles.fontSlab
  },
  headingProps: props => {
    const color = props.color || styles.colorYellow
    return {
      fontSize: props.fontSize || styles.fontHeadingSize,
      marginRight: props.rightMargin || styles.fn.getSpacing(3),
      marginBottom: props.bottomMargin || styles.fn.getSpacing(8),
      color
    }
  }
}
