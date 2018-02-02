import styles from 'Root/styles'

export default {
  headerWrapper: {
    ...styles.premade.flexRowCenter,
    height: styles.headerHeight,
    backgroundColor: styles.colorBg,
    color: styles.colorWhite,
    fontFamily: styles.fontSans
  },
  headerLogo: {
    height: styles.headerLogoHeight,
    fill: styles.colorWhite,
    marginLeft: styles.sideMargin,
    marginRight: 'auto'
  }
}
