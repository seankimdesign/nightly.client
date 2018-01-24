import _ from 'lodash'
import SVG from 'svg.js'

import styles from '../css/_config.scss'
import CONF from './config'

const landingDom = document.getElementById('landing')
const canvas = SVG(landingDom)
let renderedSymbols

const prepDraw = () => {
  const canvasHeight = landingDom.clientHeight
  const canvasWidth = landingDom.clientWidth
  const guide = CONF.guides.desktop
  const schema = getCoords(guide.row, guide.reach, canvasHeight, canvasWidth)

  if (renderedSymbols) renderedSymbols.remove()
  renderedSymbols = doRender(schema)
  canvas.add(renderedSymbols)
}

function getCoords (rows, reach, height, width) {
  const schema = []
  const distanceY = Math.round((height - (CONF.verticalPadding * 2)) / rows)
  const distanceX = Math.round(distanceY * CONF.horizontalScale)
  const cols = Math.round((width * reach / 100) / distanceX)
  for (let i = 0; i <= rows; i++) {
    const rowY = Math.round((CONF.verticalPadding) + (i * distanceY))
    let pos = Math.min(Math.ceil(((i + 1) / rows) * 10), 10)
    let maxCols = Math.floor(CONF.plotFn(pos) / 100 * cols)
    let isEclipse = Boolean(i % 2)
    for (let k = 0; k <= maxCols; k++) {
      isEclipse = !isEclipse
      schema.push({
        x: Math.round((distanceX / 2) + (k * distanceX)),
        y: rowY,
        s: isEclipse,
        c: (Math.random() * 100) < CONF.colorVariance
      })
    }
  }
  return schema
}

function doRender (schema) {
  let symbolGroup = canvas.group()
  schema.forEach(plot => {
    const color = plot.c ? styles.colorYellow : styles.colorWhite
    const elem = plot.s ? canvas.rect(CONF.symbolSize, CONF.symbolSize) : canvas.circle(CONF.symbolSize)
    elem.move(plot.x, plot.y).fill(color)
    symbolGroup.add(elem)
  })
  return symbolGroup
}

prepDraw()
window.addEventListener('resize', _.debounce(prepDraw, CONF.debounceTimer), false)
