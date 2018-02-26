import styles from 'Root/styles'

export default {
  blockLinkWrapper: {
    cursor: 'pointer',
    transition: 'color 0.4s ease-in-out, background-color 0.4s ease-in-out'
  },
  blockLinkProps: props => {
    const foreColor = props.foreColor || styles.colorWhiteAlt
    const foreHoverColor = props.foreHoverColor || props.foreColor || styles.colorWhite
    const backColor = props.backColor || 'transparent'
    const backHoverColor = props.backHoverColor || props.backColor || 'transparent'
    return {
      border: props.noBorder ? 0 : styles.fn.getBorder(props.borderColor || styles.colorWhiteAlt),
      fontSize: props.fontSize || styles.fontMenuSize,
      padding: props.padding || styles.fn.getSpacing(2),
      marginRight: props.rightMargin || styles.fn.getSpacing(3),
      marginBottom: props.bottomMargin || 0,
      borderRadius: props.noRounded ? 0 : styles.roundedCorner,
      color: foreColor,
      backgroundColor: backColor,
      ':hover': {
        color: foreHoverColor,
        backgroundColor: backHoverColor
      }
    }
  }
}
