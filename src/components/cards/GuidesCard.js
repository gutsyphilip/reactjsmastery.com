import React from "react"
import { Link } from "gatsby"
import styles from "./cards.module.scss"

const GuidesCard = ({ data }) => {
  const { title, description, id } = data
  console.log("data", data)
  return (
    <Link to={`/${id}`}>
      <div className={styles.guidesCard}>
        <h4 className={styles.guidesCard__Title}>{title}</h4>
        <p>{description}</p>
      </div>
    </Link>
  )
}

export default GuidesCard
