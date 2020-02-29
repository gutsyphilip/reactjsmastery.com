import React from "react"
import { LibraryLayout } from "../../components/layouts"
import BlogPostTemplate from "../content/BlogPost"
import { SideBar } from "../../components/sidebar"

const Library = ({ data, pageContext }) => {
  return (
    <LibraryLayout>
      <SideBar />
      <BlogPostTemplate data={data} pageContext={pageContext} />
    </LibraryLayout>
  )
}

export default Library

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
