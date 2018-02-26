import styles from 'Root/styles'

export default {
  textBase: {
    fontFamily: styles.fontSerif
  },
  textProps: props => {
    const color = props.color || styles.colorWhiteAlt
    return {
      fontSize: props.fontSize || styles.fontBaseSize,
      marginRight: props.rightMargin || styles.fn.getSpacing(0),
      marginBottom: props.bottomMargin || styles.fn.getSpacing(2),
      color
    }
  }
}
