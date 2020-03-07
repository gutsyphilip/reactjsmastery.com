const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const path = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: path,
    })
    return
  }
}
