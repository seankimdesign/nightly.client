import _ from 'lodash/function'
import SVG from 'svg.js'

import rawStyles from 'Shared/css/_config.scss'
import CONF from './config'

import svgCrescent from '../svg/crescent.svg'
import svgLogo from '../svg/logo.svg'
import svgLogoBold from '../svg/logo-bold.svg'
import util from 'Shared/js/util'

const styles = util.convertStyles(rawStyles)

const logoLinkDom = document.getElementById('nightly-link')
const subheadDom = document.getElementById('subhead')
const subheadInitialFontSize = parseInt(window.getComputedStyle(subheadDom)['fontSize'])
const landingDom = document.getElementById('svg-canvas')
const canvas = SVG(landingDom)
let initialRender = true
let renderedElems = []

const injectLogo = () => {
  logoLinkDom.innerHTML = ''
  const logoLinkCanvas = SVG(logoLinkDom)
  const logoRef = SVG.adopt(svgLogoBold.node).clone()
  const headerLogoHeight = styles.headerLogoHeight.value
  logoLinkCanvas.use(logoRef).size(headerLogoHeight * 4, headerLogoHeight)
}

const prepDraw = () => {
  const canvasHeight = landingDom.clientHeight
  const canvasWidth = landingDom.clientWidth
  const { logo, symbols, animation } = CONF.bgRender

  // TODO: Implement viewport ratio detection
  const isDesktop = true
  const guide = CONF.bgRender.spacing.guides.desktop
  const symbolSchema = getSymbolSchema(guide, canvasHeight, canvasWidth)
  const logoSchema = getLogoSchema(guide, logo.logoWidthScale, canvasHeight, canvasWidth)
  const schemas = {
    symbolSchema,
    logoSchema
  }

  moveAndResizeSubhead(guide, symbolSchema, canvasWidth)

  for (let key in renderedElems) {
    renderedElems[key].remove()
  }
  renderedElems = doRender(schemas, initialRender)
  canvas.off()
  if (isDesktop) {
    let listenerDelay = initialRender ? animation.animationDelayMax + (animation.animationDuration * 2) : 0
    _.delay(() => {
      canvas.on('mousemove', getMouseMoveEvent(guide.rows, canvasHeight, symbols, renderedElems.symbolGroup))
    }, listenerDelay
    )
  }
  initialRender = false
}

function getSymbolSchema (guide, height, width) {
  const symbolSchema = []
  const { rows, reach, subtitleRow } = guide
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
        a: (Math.random() * 100) < animation.animateVariance,
        r: i + 1 === subtitleRow
      })
    }
  }
  return symbolSchema
}

function getLogoSchema (guide, widthScale, height, width) {
  const { logoScale, logoOverlapVerticalPadding, logoOverlapHorizontalPadding, logoHorizontalPos, logoVerticalPos } = guide
  const initialHeight = Math.round(height * logoScale / 100)
  const initialWidth = Math.round(initialHeight * widthScale)
  const paddedHeight = initialHeight + (logoOverlapVerticalPadding * 2)
  const paddedWidth = initialWidth + (logoOverlapHorizontalPadding * 2)
  return {
    top: Math.round(logoVerticalPos * height / 100),
    left: Math.round(logoHorizontalPos * width / 100),
    boxHeight: paddedHeight,
    boxWidth: paddedWidth,
    verticalPadding: logoOverlapVerticalPadding,
    horizontalPadding: logoOverlapHorizontalPadding
  }
}

function moveAndResizeSubhead (guide, symbolSchema, width) {
  const { subtitleRightMarginScale, subtitlePadding } = guide
  const rightMargin = Math.round(subtitleRightMarginScale * width / 100)
  const verticalPosition = symbolSchema.find(s => s.r).y - 2

  let currentFontSize = subheadInitialFontSize
  subheadDom.style.fontSize = currentFontSize + 'px'

  let occupied = (subheadDom.clientWidth + rightMargin * 2)

  while (occupied > width) {
    currentFontSize = (parseInt(subheadDom.style.fontSize) - 1)
    subheadDom.style.fontSize = currentFontSize + 'px'
    occupied = (subheadDom.clientWidth + rightMargin * 2)
  }
  subheadDom.style.right = subtitleRightMarginScale + '%'
  subheadDom.style.paddingLeft = subtitlePadding + 'px'
  subheadDom.style.marginTop = verticalPosition - Math.round(currentFontSize / 2) + 'px'
  subheadDom.style.visibility = 'visible'
}

function doRender (schemas, doAnimate) {
  const { symbolSchema, logoSchema } = schemas

  const symbolGroup = renderSymbols(symbolSchema, logoSchema, doAnimate)
  const logoElem = renderLogo(logoSchema)

  return {symbolGroup, logoElem}
}

function renderSymbols (symbolSchema, logoSchema, doAnimate) {
  const { symbols, animation } = CONF.bgRender

  const subheadLeft = subheadDom.offsetLeft

  const logoBoxTop = logoSchema.top
  const logoBoxBottom = logoBoxTop + logoSchema.boxHeight
  const logoBoxLeft = logoSchema.left
  const logoBoxRight = logoBoxLeft + logoSchema.boxWidth

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

  symbolSchema.map((plot, indx) => {
    let noRender = util.isBetween(plot.x, logoBoxLeft, logoBoxRight) && util.isBetween(plot.y, logoBoxTop, logoBoxBottom)
    noRender = noRender || (plot.r && plot.x > subheadLeft)
    if (noRender) return
    const color = plot.c ? styles.colorYellow : styles.colorWhite
    const elemType = plot.s ? symbolsTable.crescent : symbolsTable.fullmoon
    const elem = elemType.render()
    elem.center(plot.x, plot.y).fill(color).data('indx', indx)
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
  const { top, left, boxWidth, boxHeight, verticalPadding, horizontalPadding } = logoSchema
  const elemWidth = boxWidth - (horizontalPadding * 2)
  const elemHeight = boxHeight - (verticalPadding * 2)

  const logoRef = SVG.adopt(svgLogo.node).clone()
  return canvas.use(logoRef).size(elemWidth, elemHeight)
    .move(left + horizontalPadding, top + verticalPadding).fill(styles.colorWhite)
}

function getMouseMoveEvent (rows, height, symbolConf, renderedSymbols) {
  const { detectionRange, responseFactor, responseStrength, responseThreshold } = symbolConf
  const responseRange = Math.round(height * detectionRange / rows)
  const nodeList = renderedSymbols.children()
  const easing = (x, factor) => Math.max(Math.pow((x * responseStrength) / factor, responseFactor / 100) - (x * responseThreshold), 0)
  const detectionMap = nodeList.map(node => {
    const x = node.cx()
    const y = node.cy()
    return {
      left: x - responseRange,
      right: x + responseRange,
      top: y - responseRange,
      bottom: y + responseRange,
      x,
      y,
      node
    }
  })
  return _.throttle((e) => {
    const x = e.offsetX
    const y = e.offsetY
    detectionMap.forEach(symbol => {
      const withinX = x > symbol.left && x < symbol.right
      const withinY = y > symbol.top && y < symbol.bottom
      if (withinX && withinY) {
        let diffX = Math.abs(x - symbol.x)
        let diffY = Math.abs(y - symbol.y)
        let factor = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) / responseRange
        diffX = easing(diffX, factor)
        diffY = easing(diffY, factor)
        let newX = x > symbol.x ? symbol.x - diffX : symbol.x + diffX
        let newY = y > symbol.y ? symbol.y - diffY : symbol.y + diffY
        symbol.node.center(newX, newY)
      } else {
        symbol.node.center(symbol.x, symbol.y)
      }
    })
  }, CONF.bgRender.mouseMovementThrottleTimer)
}

injectLogo()
prepDraw()
window.addEventListener('resize', _.debounce(prepDraw, CONF.bgRender.resizeRenderDebounceTimer), false)
