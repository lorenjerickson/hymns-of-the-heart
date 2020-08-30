import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'
import BannerLanding from '../components/BannerLanding'
import Pagination from '../components/pagination'

export default class CategoryList extends React.Component {
  render() {
    const items = this.props.data.allMarkdownRemark.edges
      .map(edge => edge.node.frontmatter)
      .map(item => ({
        ...item,
        ...{ tags: item.tags },
        ...{ topics: item.topics },
      }))

    const { currentPage, numPages, category } = this.props.pageContext

    return (
      <Layout>
        <Helmet>
          <title>{category}</title>
          <meta
            name="original and arranged musical works written by Loren Erickson"
            content={category}
          />
        </Helmet>
        <BannerLanding
          title={category}
          description={`My published works of music in the ${category} category.  A mix of original works and arrangements written for a variety of voices and instruments.`}
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
                      <th>Category</th>
                      <th>Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.slug}>
                        <td>{item.title}</td>
                        <td>
                          {item.tags.map(cat => (
                            <Link
                              key={`${item.slug}-${cat}`}
                              to={`/topics/${cat}`}
                            >
                              {cat}
                            </Link>
                          ))}
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

export const categoryListQuery = graphql`
  query categoryListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___title], order: ASC }
      limit: $limit
      skip: $skip
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
`
