function locateExclusiveUnit (givenValue) {
  const value = givenValue.toLowerCase()
  const units = ['px', 'em', 'rem', '%']
  const falseResult = {exclusive: false}
  const matchedUnit = units.findIndex(unit => value.indexOf(unit) > -1)
  if (matchedUnit === -1) return falseResult

  const otherUnits = [...units.slice(0, matchedUnit), ...units.slice(matchedUnit + 1)]
  const isExclusiveMatch = otherUnits.every(unit => value.indexOf(unit) === -1)
  if (!isExclusiveMatch) return falseResult

  const unit = units[matchedUnit]
  const isSingularUnit = value.indexOf(unit) === value.lastIndexOf(unit)
  if (!isSingularUnit) return falseResult

  return {
    exclusive: true,
    value: Number(value.replace(unit, '')),
    unit
  }
}

function convertStyles (styles) {
  const converted = {}
  if (typeof styles === 'object') {
    for (let key in styles) {
      if (styles.hasOwnProperty(key)) {
        const extracted = locateExclusiveUnit(styles[key])
        if (extracted.exclusive) {
          const { value, unit } = extracted
          converted[key] = {
            rawStyle: styles[key],
            value,
            unit,
            toString: () => styles[key],
            valueOf: () => value
          }
        } else {
          converted[key] = styles[key]
        }
      }
    }
  }
  return converted
}

function isBetween (val, min, max) {
  return val >= min && val <= max
}

function decimalRound (number, precision) {
  let factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}

export default {
  locateExclusiveUnit,
  convertStyles,
  isBetween,
  decimalRound
}
