export default {
  isBetween: (val, min, max) => {
    return val >= min && val <= max
  },
  decRound: (number, precision) => {
    let factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
  }
}
