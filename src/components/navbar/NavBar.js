import React from "react"
import { Link } from "gatsby"
import styles from "./navbar.module.scss"
import { LogoIcon } from "../../assets/svgs"

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link to="/">
        <LogoIcon className={styles.navBar__Logo} />
      </Link>
    </nav>
  )
}

export default NavBar
