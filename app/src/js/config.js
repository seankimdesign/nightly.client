export default {
  bgRender: {
    spacing: {
      plotFn: (x) => {
        return 160 - (107 * x) + (59.46 * Math.pow(x, 2)) - (15.02 * Math.pow(x, 3)) +
          (1.6337 * Math.pow(x, 4)) - (0.06276 * Math.pow(x, 5))
      },
      guides: {
        desktop: {
          rows: 11,
          reach: 85,
          logoScale: 13,
          logoOverlapPadding: 25,
          logoHorizontalPos: 13.5,
          logoVerticalPos: 12
        }
      },
      verticalPadding: 50,
      horizontalScale: 1.3
    },
    logo: {
      logoWidthScale: 3.42
    },
    symbols: {
      symbolSize: 7,
      crescentWidthScale: 72,
      colorVariance: 35
    },
    animation: {
      animateVariance: 90,
      animationDuration: 600,
      animationScale: 225,
      animationDelayMin: 250,
      animationDelayMax: 2500
    },
    debounceTimer: 250
  }
}
