import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'
import BannerLanding from '../components/banner-landing'
import Pagination from '../components/pagination'

export default class PortfolioList extends React.Component {
  render() {
    const items = this.props.data.allMarkdownRemark.edges
      .map(edge => edge.node.frontmatter)
      .map(item => ({
        ...item,
        ...{ tags: item.tags },
        ...{ topics: item.topics },
      }))

    const { currentPage, numPages } = this.props.pageContext

    return (
      <Layout>
        <Helmet>
          <title>Portfolio</title>
          <meta
            name="original and arranged musical works written by Loren Erickson"
            content="Portfolio"
          />
        </Helmet>
        <BannerLanding
          title="My Portfolio"
          description="Here is a collection of my publshed works of music.  There is a mix of arrangements and original works written for a variety of voices and instruments.  Please see a note about licensing of this music at the bottom of this page. "
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
                    {items.map(item => (
                      <tr key={item.slug}>
                        <td>
                          <Link to={`/composition/${item.slug}`}>{item.title}</Link>
                        </td>
                        <td>
                          {item.topics.map(cat => (
                            <Link
                              key={`${item.slug}-${cat}`}
                              to={`/topics/${cat}`}
                              className="topic"
                            >
                              {cat}
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
  query portfolioListTemplateQuery ($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
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
            topics
            tags
            slug
          }
        }
      }
    }
  }
`
