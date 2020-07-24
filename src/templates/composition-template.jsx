import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

const CompositionTemplate = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  console.log(data)

  return (
    <Layout>
      <Helmet>
        <title>Generic - Forty by HTML5 UP</title>
        <meta name="description" content="Generic Page" />
      </Helmet>

      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>{frontmatter.title}</h1>
            </header>
            <span className="image main">
              {/* <Img
                fluid={frontmatter.coverURL.childImageSharp.fluid}
                alt={frontmatter.title}
              /> */}
            </span>
            <div className="downloads main">
              <a href={frontmatter.scoreURL}>score</a>
              <a href={frontmatter.recordingURL}>recording</a>
            </div>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default CompositionTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        scoreURL
        recordingURL
        coverURL
        tags
      }
    }
  }
`
