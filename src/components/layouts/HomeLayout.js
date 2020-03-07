import React from "react"
import "../../styles/generic.scss"
import styles from "./layouts.module.scss"
import { NavBar } from "../navbar"
// import { AnnouncementStrip } from "../announcement-strip"

class HomeLayout extends React.Component {
  render() {
    const { title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <section>
        {/* <AnnouncementStrip /> */}
        <div className="topBar"></div>
        {/* <NavBar /> */}
        <main className={styles.homeLayout}>{children}</main>
      </section>
    )
  }
}

export default HomeLayout
