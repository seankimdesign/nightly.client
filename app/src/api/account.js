const contentTypeJson = new window.Headers({
  'Content-Type': 'application/json'
})

const testBody = {
  'password': 'test123'
}

export function fetchAccount () {
  return fetch('http://nightly.seankimdesign.com:5000/login/suejchoe', {
    method: 'POST',
    headers: contentTypeJson,
    body: JSON.stringify(testBody),
    credentials: 'include'
  })
    .then(response => response.json())
}
