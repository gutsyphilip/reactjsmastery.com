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
    console.log(sectionListPerformance)
    return (
      <section className={styles.sideBar}>
        {sectionListPerformance.map((section, index) => (
          <SideBarNav
            // createLink={createLink}
            // isActive={activeSection === section || sectionList.length === 1}
            key={index}
            // location={location}
            // onLinkClick={closeParentMenu}
            // onSectionTitleClick={() => this._toggleSection(section)}
            section={section}
          />
        ))}
      </section>
    )
  }
}
