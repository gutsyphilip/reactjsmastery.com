import React from "react"
import { Link } from "gatsby"
import styles from "./cards.module.scss"

const GuidesCard = () => {
  return (
    <Link to="/lol">
      <div className={styles.guidesCard}>
        <h4>GENERAL</h4>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          cum autem voluptatem ipsam at sit assumenda nostrum ad eveniet soluta?
          Tempora animi nemo sint tenetur dolores ab ipsum et facilis.
        </p>
      </div>
    </Link>
  )
}

export default GuidesCard
