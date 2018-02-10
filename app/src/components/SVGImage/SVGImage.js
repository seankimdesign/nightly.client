import React from 'react'

export default (prop) => {
  const styleProps = {
    fill: prop.fill || 'inherit',
    height: prop.height || 'inherit',
    width: prop.width || 'inherit'
  }

  return (
    <svg {...styleProps}>
      <use href={'#' + prop.id} />
    </svg>
  )
}
