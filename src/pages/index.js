import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import SEO from "../components/seo"
import { HomeLayout } from "../components/layouts"
import { Grid } from "../components/utility/Grid"
import { GuidesCard } from "../components/cards"
import homePageData from "../../content/home.yml"

console.log(homePageData)
class Home extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <HomeLayout location={this.props.location} title={siteTitle}>
        {/* <Grid columns="1fr 1fr" gap="100px"> */}
        <section
          style={{
            color: "#FFFFFF",
          }}
        >
          <h1
            style={{
              fontSize: "2.5em",
              lineHeight: "1.2",
              color: "#FFFFFF !important",
            }}
          >
            Hello, Welcome <br /> to React Mastery.
          </h1>
          <br />
          <p>
            <span className="bgGradient">Learn</span> and{" "}
            <span className="bgGradient">master</span> the art of building
            complex applications using React JS through a{" "}
            <span className="bgGradient">
              thorough and practical examination of concepts and practices
            </span>{" "}
            that you may encounter on your journey as a React developer.
            {/* build scalable applications that are blazing fast, scalable,
              highly performant and fully functional */}
            {/* using React! */}
          </p>
        </section>
        <section>
          {homePageData.map(({ title, items }) => {
            return (
              <>
                {items.map(item => {
                  console.log(item)
                  return <GuidesCard data={item} />
                })}
              </>
            )
          })}
        </section>
      </HomeLayout>
    )
  }
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
