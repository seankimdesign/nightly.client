import _ from 'lodash'
import SVG from 'svg.js'

import styles from '../css/_config.scss'
import CONF from './config'

import svgCrescent from '../svg/crescent.svg'
import svgLogo from '../svg/logo.svg'
import util from './util'

const landingDom = document.getElementById('landing')
const canvas = SVG(landingDom)
let initialRender = true
let renderedElems = []

const prepDraw = () => {
  const canvasHeight = landingDom.clientHeight
  const canvasWidth = landingDom.clientWidth
  // TODO: Implement viewport ratio detection
  const guide = CONF.bgRender.spacing.guides.desktop
  const symbolSchema = getSymbolSchema(guide, canvasHeight, canvasWidth)
  const logoSchema = getLogoSchema(guide, CONF.bgRender.logo.logoWidthScale, canvasHeight, canvasWidth)
  const schemas = {
    symbolSchema,
    logoSchema
  }

  if (renderedElems.length) renderedElems.forEach(elem => elem.remove())

  renderedElems = doRender(schemas, initialRender)
  console.log(renderedElems)
  // renderedElems.forEach(elem => canvas.add(elem))
  initialRender = false
}

function getSymbolSchema (guide, height, width) {
  const symbolSchema = []
  const { rows, reach } = guide
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
      symbolSchema.push({
        x: Math.round((distanceX / 2) + (k * distanceX)),
        y: rowY,
        s: isCrescent,
        c: (Math.random() * 100) < symbols.colorVariance,
        a: (Math.random() * 100) < animation.animateVariance
      })
    }
  }
  return symbolSchema
}

function getLogoSchema (guide, widthScale, height, width) {
  const { logoScale, logoOverlapPadding, logoHorizontalPos, logoVerticalPos } = guide
  const initialHeight = Math.round(height * logoScale / 100)
  const initialWidth = Math.round(initialHeight * widthScale)
  const paddedHeight = initialHeight + (logoOverlapPadding * 2)
  const paddedWidth = initialWidth + (logoOverlapPadding * 2)
  return {
    top: Math.round(logoVerticalPos * height / 100),
    left: Math.round(logoHorizontalPos * width / 100),
    boxHeight: paddedHeight,
    boxWidth: paddedWidth,
    padding: logoOverlapPadding
  }
}

function doRender (schemas, doAnimate) {
  const { symbolSchema, logoSchema } = schemas

  const symbolGroup = renderSymbols(symbolSchema, logoSchema, doAnimate)
  const logoElem = renderLogo(logoSchema)

  console.log(logoElem)

  return [symbolGroup, logoElem]
}

function renderSymbols (symbolSchema, logoSchema, doAnimate) {
  const { symbols, animation } = CONF.bgRender
  const boxTop = logoSchema.top
  const boxBottom = boxTop + logoSchema.boxHeight
  const boxLeft = logoSchema.left
  const boxRight = boxLeft + logoSchema.boxWidth

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

  const symbolGroup = canvas.group()

  symbolSchema.map(plot => {
    if (util.isBetween(plot.x, boxLeft, boxRight) && util.isBetween(plot.y, boxTop, boxBottom)) return
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

function renderLogo (logoSchema) {
  const { top, left, boxWidth, boxHeight, padding } = logoSchema
  const elemWidth = boxWidth - (padding * 2)
  const elemHeight = boxHeight - (padding * 2)

  const logoRef = SVG.adopt(svgLogo.node).clone()
  return canvas.use(logoRef).size(elemWidth, elemHeight).move(left + padding, top + padding).fill(styles.colorWhite)
}

prepDraw()
window.addEventListener('resize', _.debounce(prepDraw, CONF.bgRender.debounceTimer), false)
