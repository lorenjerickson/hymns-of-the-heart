import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import BannerLanding from '../components/BannerLanding'

const Pagination = ({ currentPage, numPages }) => (<ul className="pagination">
  <li>
    <Link to={`/portfolio/${currentPage === 2 ? '' : currentPage - 1}`} className={`button small ${currentPage === 1 ? 'disabled' : ''}`}>
      <span>Prev</span>
    </Link>
  </li>

  {Array.from({ length: numPages }, (_, i) => (
    <li key={`portfolio-${i + 1}`}>
      <Link to={`/portfolio/${i === 0 ? "" : i + 1}`} className={`page ${currentPage === i + 1 ? 'active' : ''}`}>
        {i + 1}
      </Link>
    </li>
  ))}

  <li>
    <Link to={`/portfolio/${currentPage + 1}`} className={`button small ${currentPage === numPages ? 'disabled' : ''}`}>
      <span>Next</span>
    </Link>
  </li>
</ul>)

export default class PortfolioList extends React.Component {


  render() {
    const items = this.props.data.allMarkdownRemark.edges.map(edge => edge.node.frontmatter)
      .map(item => ({
        ...item,
        ...{ tags: item.tags.split(',') },
        ...{ categories: item.categories.split(',') }
      }))

    const { currentPage, numPages } = this.props.pageContext

    return (
      <Layout>
        <Helmet>
          <title>Portfolio</title>
          <meta name="original and arranged musical works written by Loren Erickson" content="Portfolio" />
        </Helmet>
        <BannerLanding />
        <div id="main">
          <section id="one">
            <div className="inner">
              <Pagination currentPage={currentPage} numPages={numPages} />
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Categories</th>
                      <th>Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.slug}>
                        <td>{item.title}</td>
                        <td>{item.categories.map(cat => (
                          <Link key={`${item.slug}-${cat}`} to={`/categories/${cat}`}>{cat}</Link>
                        ))}</td>
                        <td>{item.tags.map(tag => (
                          <Link key={`${item.slug}-${tag}`} to={`/tags/${tag}`} className="tag">{tag}</Link>
                        ))}</td>
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
export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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