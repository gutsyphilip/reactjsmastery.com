import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styles from "./sidebar.module.scss"

export default class SideBarNav extends Component {
  static propTypes = {
    section: PropTypes.string,
  }
  state = { uid: ("" + Math.random()).replace(/\D/g, "") }

  render() {
    const { section } = this.props
    const { uid } = this.state
    return (
      <nav className={styles.sideBarNav}>
        <h4>{section.title.toUpperCase()}</h4>
        <ul id={uid}>
          {section.items.map((item, index) => (
            <li key={item.id}>
              <Link to={`${section.directory}/${item.id}`}>{item.title}</Link>

              {/* {createLink({
                isActive: isScrollSync
                  ? activeItemId === item.id
                  : isItemActive(location, item),
                item: section.isOrdered
                  ? { ...item, title: `${index + 1}. ${item.title}` }
                  : item,
                location,
                onLinkClick,
                section,
              })} */}

              {item.subitems && (
                <ul css={{ marginLeft: 20 }}>
                  {item.subitems.map(subitem => (
                    <li key={subitem.id}>
                      <Link to={subitem.id}>{subitem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}
