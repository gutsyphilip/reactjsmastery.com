import React from "react"
import { graphql } from "gatsby"
import { GuidesLayout } from "../../components/layouts"
import BlogPostTemplate from "../content/BlogPost"
import { SideBar } from "../../components/sidebar"

const Guides = ({ data, pageContext }) => {
  return (
    <GuidesLayout>
      <SideBar />
      <BlogPostTemplate data={data} pageContext={pageContext} />
    </GuidesLayout>
  )
}

export default Guides

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
