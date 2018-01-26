import _ from 'lodash'
import SVG from 'svg.js'

import styles from '../css/_config.scss'
import CONF from './config'

import svgCrescent from '../svg/crescent.svg'

const landingDom = document.getElementById('landing')
const canvas = SVG(landingDom)
let initialRender = true
let renderedSymbols

const prepDraw = () => {
  const canvasHeight = landingDom.clientHeight
  const canvasWidth = landingDom.clientWidth
  // TODO: Implement viewport ratio detection
  const guide = CONF.bgRender.spacing.guides.desktop
  const schema = getCoords(guide.row, guide.reach, canvasHeight, canvasWidth)

  if (renderedSymbols) renderedSymbols.remove()
  renderedSymbols = doRender(schema, initialRender)
  canvas.add(renderedSymbols)
  initialRender = false
}

function getCoords (rows, reach, height, width) {
  const schema = []
  const { spacing, symbols, animation } = CONF.bgRender
  const distanceY = Math.round((height - (spacing.verticalPadding * 2)) / rows)
  const distanceX = Math.round(distanceY * spacing.horizontalScale)
  const cols = Math.round((width * reach / 100) / distanceX)

  for (let i = 0; i <= rows; i++) {
    const rowY = Math.round((spacing.verticalPadding) + (i * distanceY))
    let pos = Math.min(Math.ceil(((i + 1) / rows) * 10), 10)
    let maxCols = Math.floor(spacing.plotFn(pos) / 100 * cols)
    let isCrescent = Boolean(i % 2)
    for (let k = 0; k <= maxCols; k++) {
      isCrescent = !isCrescent
      schema.push({
        x: Math.round((distanceX / 2) + (k * distanceX)),
        y: rowY,
        s: isCrescent,
        c: (Math.random() * 100) < symbols.colorVariance,
        a: (Math.random() * 100) < animation.animateVariance
      })
    }
  }
  return schema
}

function doRender (schema, doAnimate) {
  const { symbols, animation } = CONF.bgRender
  const crescentNode = svgCrescent.node.firstElementChild
  const crescentWidth = Math.round(symbols.symbolSize * symbols.crescentWidthScale / 100)
  const symbolsTable = {
    fullmoon: {
      render: () => canvas.circle(symbols.symbolSize),
      width: symbols.symbolSize,
      height: symbols.symbolSize
    },
    crescent: {
      render: () => SVG.adopt(crescentNode).clone().size(crescentWidth, symbols.symbolSize),
      width: crescentWidth,
      height: symbols.symbolSize
    }
  }

  let symbolGroup = canvas.group()

  schema.forEach(plot => {
    const color = plot.c ? styles.colorYellow : styles.colorWhite
    const elemType = plot.s ? symbolsTable.crescent : symbolsTable.fullmoon
    const elem = elemType.render()
    elem.center(plot.x, plot.y).fill(color)
    if (doAnimate && plot.a) {
      const zoomWidth = elemType.width * (animation.animationScale / 100)
      const zoomHeight = elemType.height * (animation.animationScale / 100)
      const centerOffsetX = Math.round((zoomWidth - elemType.width) / 2)
      const centerOffsetY = Math.round((zoomHeight - elemType.height) / 2)
      const startAfter = parseInt(animation.animationDelayMax * Math.random()) + animation.animationDelayMin
      elem.animate(animation.animationDuration, '<', startAfter)
        .size(zoomWidth, zoomHeight).dmove(-centerOffsetX, -centerOffsetY)
        .animate(animation.animationDuration, '>')
        .size(elemType.width, elemType.height).center(plot.x, plot.y)
    }
    symbolGroup.add(elem)
  })
  return symbolGroup
}

prepDraw()
window.addEventListener('resize', _.debounce(prepDraw, CONF.bgRender.debounceTimer), false)
