import React from "react"
import { Link } from "gatsby"
import styles from "./announcement-strip.module.scss"

const AnnouncementStrip = () => {
  return (
    <nav className={styles.announcementStrip}>
      <p>New! Tooling section of React Perfomance guides to now published!</p>
      &nbsp;
      <Link to="/performance/tooling.html">
        <a>See here</a>
      </Link>
    </nav>
  )
}

export default AnnouncementStrip
