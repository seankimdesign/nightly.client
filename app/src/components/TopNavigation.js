import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  const links = props.links.map(link =>
    <h5 key={link.url}>
      <Link to={link.url}>{link.text}</Link>
    </h5>
  )
  return (
    <nav>
      <div>This is a top nav</div>
      {links}
    </nav>
  )
}
