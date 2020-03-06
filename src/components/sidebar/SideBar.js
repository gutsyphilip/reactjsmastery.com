import React, { Component } from "react"
import PropTypes from "prop-types"
import { sectionListPerformance } from "../../utils/sectionList"
import SideBarNav from "./SideBarNav"
import styles from "./sidebar.module.scss"
import { CloseIcon, MenuIcon } from "../../assets/svgs"

export default class SideBar extends Component {
  static propTypes = {
    prop: PropTypes,
  }
  state = { mobileMenuOpen: false }

  handleToggleMobileMenu = () => {
    this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen })
  }

  render() {
    const { mobileMenuOpen } = this.state
    return (
      <section
        className={`${styles.sideBar} ${mobileMenuOpen &&
          styles.sideBar__isOpen}`}
      >
        {sectionListPerformance.map((section, index) => (
          <SideBarNav key={index} section={section} />
        ))}

        <div
          className={styles.MenuIcon__Wrapper}
          onClick={this.handleToggleMobileMenu}
        >
          {!mobileMenuOpen && <MenuIcon className={styles.MenuIcon} />}
          {mobileMenuOpen && <CloseIcon className={styles.MenuIcon} />}
        </div>
      </section>
    )
  }
}
