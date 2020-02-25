import React from "react"
import "../../styles/generic.scss"
import styles from "./layouts.module.scss"

const PageLayout = () => {
  return (
    <section>
      <div className="topBar"></div>
      <main className={styles.pageLayout}>{children}</main>
    </section>
  )
}

export default PageLayout
