import React from "react"
import { Link } from "gatsby"
import styles from "./cards.module.scss"

const GuidesCard = ({ data }) => {
  const { title, description, id } = data
  console.log("data", data)
  return (
    <div className={styles.guidesCard}>
      <Link to={`/${id ? id : ""}/`}>
        <h5 className={styles.guidesCard__Title}>{title}</h5>
        <p className={styles.guidesCard__Description}>{description}</p>
      </Link>
    </div>
  )
}

export default GuidesCard
