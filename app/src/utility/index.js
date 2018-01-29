export function combineNames (nameObject) {
  if (nameObject.hasOwnProperty('first') && nameObject.hasOwnProperty('last')) {
    const first = nameObject.first[0].toUpperCase() + nameObject.first.slice(1)
    const last = nameObject.last[0].toUpperCase() + nameObject.last.slice(1)
    return `${first} ${last}`
  }
}
