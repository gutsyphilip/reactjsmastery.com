import React from "react"
import "../../styles/generic.scss"
import styles from "./layouts.module.scss"
import { NavBar } from "../navbar"
// import { AnnouncementStrip } from "../announcement-strip"

const GuidesLayout = ({ title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <section>
      {/* <AnnouncementStrip />  */}
      <div className="topBar"></div>
      <NavBar />
      <main className={styles.guidesLayout}>{children}</main>
    </section>
  )
}

export default GuidesLayout
