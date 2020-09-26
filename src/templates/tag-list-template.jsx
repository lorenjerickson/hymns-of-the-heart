import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'
import BannerLanding from '../components/BannerLanding'
import Pagination from '../components/pagination'

export default class TagListTemplate extends React.Component {
  render() {
    console.log(this.props.data)

    const items = this.props.data.allMarkdownRemark.edges
      .map(edge => edge.node.frontmatter)
      .map(item => ({
        ...item,
        ...{ tags: item.tags },
        ...{ topics: item.topics },
      }))

    const { currentPage, numPages, tagName } = this.props.pageContext

    return (
      <Layout>
        <Helmet>
          <title>Portfolio</title>
          <meta
            name="original and arranged musical works written by Loren Erickson"
            content="Tags"
          />
        </Helmet>
        <BannerLanding
          title={`Tags - ${tagName}`}
          description={`A collection of my publshed works of music that have been tagged with "${tagName}".  Please see a note about licensing of this music at the bottom of this page. `}
        />
        <div id="main">
          <section id="one">
            <div className="inner">
              <Pagination currentPage={currentPage} numPages={numPages} />
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Topics</th>
                      <th>Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={`${item.slug}-${index}`}>
                        <td>
                          <Link to={`/composition/${item.slug}`}>
                            {item.title}
                          </Link>
                        </td>

                        <td>
                          {item.topics.map(topic => (
                            <Link
                              key={`${item.slug}-${topic}`}
                              to={`/topics/${topic}`}
                              className="topic"
                            >
                              {topic}
                            </Link>
                          ))}
                        </td>
                        <td>
                          {item.tags.map((tag, i) => (
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
                  {/* <tfoot>
                        <tr>
                          <td colSpan="2" />
                          <td>100.00</td>
                        </tr>
                      </tfoot> */}
                </table>
              </div>
              <Pagination currentPage={currentPage} numPages={numPages} />
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query tagListTemplateQuery($skip: Int!, $limit: Int!, $tagName: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tagName] } } }
      sort: { fields: [frontmatter___title], order: ASC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            slug
            topics
            tags
          }
        }
      }
    }
  }
`
