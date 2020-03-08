/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = ({ authorProfile }) => {
  const { name, bio, profilePicture, social } = authorProfile
  return (
    <div
      style={{
        display: `flex`,
        marginTop: 40,
      }}
    >
      {/* <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={name}
        style={{
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      /> */}
      <img
        src={`/authors/${profilePicture}`}
        alt={name}
        style={{
          marginBottom: 0,
          marginRight: 10,
          objectFit: "cover",
          maxWidth: "80px",
          maxHeight: "80px",
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{name}</strong> who {bio}
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter
        </a>
      </p>
    </div>
  )
}

export default Bio
