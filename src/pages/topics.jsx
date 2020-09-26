import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import bannerLanding from '../components/bannerLanding'
import { graphql, useStaticQuery, Link } from 'gatsby'

const Topics = () => {
  const data = useStaticQuery(graphql`
    query tagsQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              topics
              title
              tags
              slug
            }
          }
        }
      }
    }
  `)

  const songs = data.allMarkdownRemark.edges
    .map(edge => edge.node.frontmatter)
    .map(song => ({
      ...song,
      ...{ tags: song.tags },
      ...{ topics: song.topics },
    }))

  const grouped = songs.reduce((acc, curr) => {
    curr.topics.forEach(t => {
      let topic = acc.find(c => c.topic === t)
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

  grouped.forEach(cat => {
    cat.fontSize = Math.floor(50 * (cat.items.length / grouped.length) + 10)
  })

  return (
    <Layout>
      <Helmet>
        <title>Topics - Hymns of the Heart</title>
        <meta name="description" content="Topics Page" />
      </Helmet>

      <bannerLanding
        title="Topics"
        description="General topics of works found on this site."
      />

      <div id="main">
        <section id="one">
          {grouped.map((grp, i) => (
            <div className="inner" key={`${grp.name}-${i}`}>
              <h2>{grp.topic}</h2>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grp.items.map(item => (
                      <tr key={item.slug}>
                        <td>
                          <Link to={`/composition/${item.slug}`}>
                            {item.title}
                          </Link>
                        </td>
                        <td>
                          {item.tags.map(tag => (
                            <Link
                              key={`${item.slug}-${tag}`}
                              to={`/tags/${tag}`}
                              className="tag"
                            >
                              {tag}
                            </Link>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Topics
