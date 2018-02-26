import styles from 'Root/styles'

export default {
  ButtonWrapper: {
    cursor: 'pointer',
    transition: 'color 0.4s ease-in-out, background-color 0.4s ease-in-out'
  },
  ButtonProps: props => {
    const foreColor = props.foreColor || styles.colorWhiteAlt
    const foreHoverColor = props.foreHoverColor || props.foreColor || styles.colorWhite
    const backColor = props.backColor || 'transparent'
    const backHoverColor = props.backHoverColor || props.backColor || 'transparent'
    return {
      border: props.noBorder ? 0 : styles.fn.getBorder(props.borderColor || styles.colorWhiteAlt),
      fontSize: props.fontSize || styles.fontMenuSize,
      marginRight: props.rightMargin || styles.fn.getSpacing(3),
      marginBottom: props.bottomMargin || 0,
      borderRadius: props.noRounded ? 0 : styles.roundedCorner,
      padding: props.asLink ? 0 : props.padding || styles.fn.getSpacing(3, 4),
      color: foreColor,
      backgroundColor: backColor,
      ':hover': {
        color: foreHoverColor,
        backgroundColor: backHoverColor
      }
    }
  }
}
