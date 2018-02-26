import styles from 'Root/styles'

export default {
  pageWrapper: {
    fontFamily: styles.fontSans,
    height: `calc(100vh - ${styles.headerHeight}px)`,
    margin: '0 ' + styles.sideMargin
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
