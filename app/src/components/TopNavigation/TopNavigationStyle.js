import styles from 'Root/styles'

export default {
  topNavigationWrapper: {
    ...styles.premade.flexRowCenter
  },
  topNavigationLinkAttributes: {
    padding: styles.fn.getSpacing(4, 6),
    color: styles.colorWhite,
    backHoverColor: styles.colorBgAlt
  }
}
