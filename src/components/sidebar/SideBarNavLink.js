import React from "react"
import { Link } from "gatsby"

export default ({ isActive, item, section, ...rest }) => {
  return (
    <Link
      to={`${section.directory}/${item.id}/`}
      {...rest}
      //   partiallyActive={true}
    >
      {item.title}
    </Link>
  )
}
