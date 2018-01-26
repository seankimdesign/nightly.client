import _ from 'lodash'
import SVG from 'svg.js'

import styles from '../css/_config.scss'
import CONF from './config'
import symbols from '../svg/crescent.svg'

const landingDom = document.getElementById('landing')
const canvas = SVG(landingDom)
let initialRender = true
let renderedSymbols

const prepDraw = () => {
  const canvasHeight = landingDom.clientHeight
  const canvasWidth = landingDom.clientWidth
  const guide = CONF.guides.desktop
  const schema = getCoords(guide.row, guide.reach, canvasHeight, canvasWidth)

  if (renderedSymbols) renderedSymbols.remove()
  renderedSymbols = doRender(schema, initialRender)
  canvas.add(renderedSymbols)
  initialRender = false
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
        c: (Math.random() * 100) < CONF.colorVariance,
        a: (Math.random() * 100) < CONF.animateVariance
      })
    }
  }
  return schema
}

function doRender (schema, doAnimate) {
  let symbolGroup = canvas.group()
  schema.forEach(plot => {
    const color = plot.c ? styles.colorYellow : styles.colorWhite
    const elem = plot.s
      ? SVG.adopt(document.getElementById('crescent_crescent')).clone()
      : canvas.circle(CONF.symbolSize)
    elem.size(CONF.symbolSize, CONF.symbolSize).center(plot.x, plot.y).fill(color)
    if (doAnimate && plot.a) {
      const blownUp = CONF.symbolSize * (CONF.animationScale / 100)
      const centerOffset = parseInt((blownUp - CONF.symbolSize) / 2)
      const startAfter = parseInt(CONF.animationDelayMax * Math.random()) + CONF.animationDelayMin
      elem.animate(CONF.animationDuration, '<', startAfter)
        .size(blownUp, blownUp).dmove(-centerOffset, -centerOffset)
        .animate(CONF.animationDuration, '>')
        .size(CONF.symbolSize, CONF.symbolSize).center(plot.x, plot.y)
    }
    symbolGroup.add(elem)
  })
  return symbolGroup
}

prepDraw()
window.addEventListener('resize', _.debounce(prepDraw, CONF.debounceTimer), false)
