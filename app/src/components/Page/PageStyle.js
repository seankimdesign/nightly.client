import styles from 'Root/styles'

export default {
  pageWrapper: {
    fontFamily: styles.fontSans,
    backgroundColor: styles.colorBgAlt,
    height: `calc(100vh - ${styles.headerHeight}px)`
  },
  pageInnerRow: {
    padding: '20px',
    display: 'flex'
  },
  pageInnerColumn: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  }
}
