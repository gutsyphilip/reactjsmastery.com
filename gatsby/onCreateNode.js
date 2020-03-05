const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const path = createFilePath({ node, getNode })
    path[path.length - 1] = ".html"
    console.log(path)

    // slug = `/${path.replace(".md", ".html")}`

    createNodeField({
      name: `slug`,
      node,
      value: path,
    })
    return
  }
}
