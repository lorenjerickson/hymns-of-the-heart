/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

async function createCompositionPages(graphql, reporter, createPage) {
  const compositionTemplate = require.resolve(
    `./src/templates/composition-template.jsx`,
  )
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              date
              tags
              categories
              scoreURL
              recordingURL
              coverURL
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/composition/${node.frontmatter.slug}`,
      component: compositionTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        coverURL: node.frontmatter.coverURL,
        recordingURL: node.frontmatter.recordingURL,
        scoreURL: node.frontmatter.scoreURL,
      },
    })
  })
}

async function createPortfolioPages(graphql, reporter, createPage) {
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title] }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug            
              }
              frontmatter {
                slug
                title                
                categories
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // ...
  // Create portfolio-list pages
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/portfolio` : `/portfolio/${i + 1}`,
      component: path.resolve("./src/templates/portfolio-list-template.jsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

// async function createCategoryPages(graphql, reporter, createPage) {
//   const categoryTemplate = require.resolve(
//     `./src/templates/category-template.jsx`,
//   )
//   const result = await graphql(`
//     {
//       allMarkdownRemark(
//         sort: { order: DESC, fields: [frontmatter___date] }
//         limit: 1000
//       ) {
//         edges {
//           node {
//             frontmatter {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `)
//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//     createPage({
//       path: node.frontmatter.slug,
//       component: categoryTemplate,
//       context: {
//         // additional data can be passed via context
//         slug: node.frontmatter.slug,
//       },
//     })
//   })
// }

// async function createTagPages(graphql, reporter, createPage) {
//   const categoryTemplate = require.resolve(
//     `./src/templates/category-template.jsx`,
//   )
//   const result = await graphql(`
//     {
//       allMarkdownRemark(
//         sort: { order: DESC, fields: [frontmatter___date] }
//         limit: 1000
//       ) {
//         edges {
//           node {
//             frontmatter {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `)
//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//     createPage({
//       path: node.frontmatter.slug,
//       component: categoryTemplate,
//       context: {
//         // additional data can be passed via context
//         slug: node.frontmatter.slug,
//       },
//     })
//   })
// }

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  await createCompositionPages(graphql, reporter, createPage)
  await createPortfolioPages(graphql, reporter, createPage)
  // await createCategoryPages(graphql, reporter, createPage)
  // await createCategoryPages(graphql, reporter, createPage)

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

