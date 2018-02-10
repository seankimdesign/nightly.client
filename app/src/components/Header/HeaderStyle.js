import styles from 'Root/styles'

export default {
  headerWrapper: {
    ...styles.premade.flexRowCenter,
    height: styles.headerHeight,
    backgroundColor: styles.colorBg,
    color: styles.colorWhite,
    fontFamily: styles.fontSans
  },
  headerLogoContainer: {
    height: styles.headerLogoHeight,
    marginLeft: styles.sideMargin,
    marginRight: 'auto'
  },
  headerLogo: {
    height: styles.headerLogoHeight,
    width: styles.headerLogoHeight * 4,
    fill: styles.colorWhite
  }
}
