import React, { Component } from "react"
import PropTypes from "prop-types"
import { sectionListPerformance } from "../../utils/sectionList"
import SideBarNav from "./SideBarNav"
import styles from "./sidebar.module.scss"

export default class SideBar extends Component {
  static propTypes = {
    prop: PropTypes,
  }

  render() {
    return (
      <section className={styles.sideBar}>
        {sectionListPerformance.map((section, index) => (
          <SideBarNav key={index} section={section} />
        ))}
      </section>
    )
  }
}
