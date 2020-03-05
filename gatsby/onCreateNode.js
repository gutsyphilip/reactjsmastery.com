const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // const { permalink, redirect_from } = node.frontmatter
  // const { relativePath, sourceInstanceName } = getNode(node.parent)
  // console.log(node)

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
