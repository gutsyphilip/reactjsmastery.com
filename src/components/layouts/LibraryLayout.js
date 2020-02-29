import React from "react"
import "../../styles/generic.scss"
import styles from "./layouts.module.scss"

const LibraryLayout = ({ title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <section>
      <div className="topBar"></div>
      <main className={styles.libraryLayout}>{children}</main>
    </section>
  )
}

export default LibraryLayout
