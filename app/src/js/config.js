export default {
  bgRender: {
    spacing: {
      plotFn: (x) => {
        return 160 - (107 * x) + (59.46 * Math.pow(x, 2)) - (15.02 * Math.pow(x, 3)) +
          (1.6337 * Math.pow(x, 4)) - (0.06276 * Math.pow(x, 5))
      },
      guides: {
        desktop: {
          row: 11,
          reach: 85,
          logoScale: 15,
          logox: 10,
          logoy: 10
        }
      },
      verticalPadding: 50,
      horizontalScale: 1.3
    },
    symbols: {
      symbolSize: 7,
      crescentWidthScale: 72,
      colorVariance: 35
    },
    animation: {
      animateVariance: 45,
      animationDuration: 500,
      animationScale: 175,
      animationDelayMin: 300,
      animationDelayMax: 2500
    },
    debounceTimer: 250
  }
}
