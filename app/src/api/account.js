const contentTypeJson = new window.Headers({
  'Content-Type': 'application/json'
})

const testBody = {
  'password': 'test123'
}

export function fetchAccount () {
  return fetch('http://localhost:5000/login/suejchoe', {
    method: 'POST',
    headers: contentTypeJson,
    body: JSON.stringify(testBody)
  })
    .then(response => response.json())
}
