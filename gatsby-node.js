/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

/**
 *
 * @param {*} graphql function to invoke GraphQL queries
 * @param {*} reporter unknown
 * @param {*} createPage function to create pages from GraphQL query results
 */
async function createCompositionPages(graphql, reporter, createPage) {
  const compositionTemplate = require.resolve(
    `./src/templates/composition-template.jsx`,
  )
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___title] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              date
              tags
              topics
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
    const data = {
      path: `/composition/${node.frontmatter.slug}`,
      component: compositionTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        coverPath: `portfolio/${node.frontmatter.slug}/${node.frontmatter.slug}-01.png`,
        recordingPath: `portfolio/${node.frontmatter.slug}/${node.frontmatter.slug}.mp3`,
        scorePath: `portfolio/${node.frontmatter.slug}/${node.frontmatter.slug}.pdf`
      },
    }

    console.log(data)

    createPage(data)
  })
}

/**
 * Create index pages for all songs
 * @param {*} graphql function to invoke GraphQL queries
 * @param {*} reporter unknown
 * @param {*} createPage function to create pages from GraphQL query results
 */
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
            }
          }
        }
      }
    `,
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
      component: path.resolve('./src/templates/portfolio-list-template.jsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

/**
 * Create index pages for each topic (e.g., /topics/hymns)
 * @param {*} graphql function to invoke GraphQL queries
 * @param {*} reporter unknown
 * @param {*} createPage function to create pages from GraphQL query results
 */
async function createTopicPages(graphql, reporter, createPage) {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___title] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              topics
              tags
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

  const topics = result.data.allMarkdownRemark.edges
    .map(edge => edge.node.frontmatter)
    .reduce((acc, curr) => {
      curr.topics.forEach(t => {
        let topic = acc.find(itm => itm.tag === t)
        if (!topic) {
          topic = {
            topic: t,
            items: [],
          }

          acc.push(topic)
        }

        topic.items.push(curr)
      })

      return acc
    }, [])

  const postsPerPage = 10
  topics.forEach((topic, i) => {
    const numPages = Math.ceil(topic.items.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/topics/${topic.topic}` : `/topics/${topic.topic}/${i + 1}`,
        component: path.resolve('./src/templates/topic-list-template.jsx'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          topic: topic.topic,
        },
      })
    })
  })
}

async function createTagPages(graphql, reporter, createPage) {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___title] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              topics
              tags
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

  const tags = result.data.allMarkdownRemark.edges
    .map(edge => edge.node.frontmatter)
    .reduce((acc, curr) => {
      curr.tags.forEach(t => {
        let tag = acc.find(itm => itm.tag === t)
        if (!tag) {
          tag = {
            tag: t,
            items: [],
          }

          acc.push(tag)
        }

        tag.items.push(curr)
      })

      return acc
    }, [])

  tags.forEach((tag, i) => {
    const postsPerPage = 10
    const numPages = Math.ceil(tag.items.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tags/${tag.tag}` : `/tags/${tag.tag}/${i + 1}`,
        component: path.resolve('./src/templates/tag-list-template.jsx'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          tagName: tag.tag,
        },
      })
    })
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  await createCompositionPages(graphql, reporter, createPage)
  await createPortfolioPages(graphql, reporter, createPage)
  await createTopicPages(graphql, reporter, createPage)
  await createTagPages(graphql, reporter, createPage)
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
