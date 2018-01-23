import _ from 'lodash'

const delayBy = 800
let textArr = [
  'Welcome',
  'To',
  'Nightly',
  'Landing',
  'Page',
  'Hooray!'
]

const writer = content => (document.getElementById('content').innerText += content + '\n')
textArr.map((text, i) => _.delay.apply({}, [writer, delayBy * i, text]))
