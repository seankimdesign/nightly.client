export function fetchPerson () {
  return fetch('https://randomuser.me/api/?nat=gb,us')
    .then(response => response.json())
    .then(response => response.results[0])
}
