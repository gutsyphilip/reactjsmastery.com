import React from "react"
import "../../styles/generic.scss"
import styles from "./layouts.module.scss"

class HomeLayout extends React.Component {
  render() {
    const { title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <section>
        <div className="topBar"></div>
        <main className={styles.homeLayout}>{children}</main>
      </section>
    )
  }
}

export default HomeLayout
