import React from "react"
import { Link } from "gatsby"
import styles from "./navbar.module.scss"

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link to="/">
        <h4>REACTJS MASTERY</h4>
      </Link>
    </nav>
  )
}

export default NavBar
