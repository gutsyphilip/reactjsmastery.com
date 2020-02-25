/**
 *
 * @flow
 */

import React from "react"

/**
 * Convenience component for declaring a grid layout.
 */
const Grid = ({
  children,
  rows = "auto",
  columns = "1fr 1fr",
  type = "div",
  gap = "20px",
  ...rest
}) =>
  React.createElement(
    type,
    {
      style: {
        display: "grid",
        gridTemplateRows: rows,
        gridTemplateColumns: columns,
        gridGap: gap,
      },
      ...rest,
    },
    children
  )

export default Grid
