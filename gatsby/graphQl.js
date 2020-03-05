exports.getNewestContent = async (graphql, slug) => {
  return await graphql(
    `
          {
            allMarkdownRemark(
              limit: 1
              filter: { fileAbsolutePath: { regex: "${slug}/" } }
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
  )
}
