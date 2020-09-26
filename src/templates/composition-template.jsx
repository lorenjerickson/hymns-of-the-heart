import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Helmet from 'react-helmet'

const CompositionTemplate = ({ data }) => {
  const { markdownRemark, cover, recording, score } = data
  const { frontmatter, html } = markdownRemark

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
            <div className="image left margin padding">
              <img src={cover.publicURL} alt="frontmatter.title" />
            </div>
            <div className="audio">
              <audio src={recording.publicURL}></audio>
            </div>

            <div
              className="margin padding"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="downloads main">
              <div>
                <span className="icon fa-file-pdf-o" />
                {` `}
                <a href={score.publicURL}>{frontmatter.title} (score)</a>
              </div>

              <div>
                <span className="icon fa-music" />
                {` `}
                <a href={recording.publicURL}>
                  {frontmatter.title} (recording)
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default CompositionTemplate

export const pageQuery = graphql`
  query compositionTemplateQuery (
    $slug: String!
    $coverURL: String!
    $recordingURL: String!
    $scoreURL: String!
  ) {
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
    cover: file(relativePath: { eq: $coverURL }) {
      publicURL
    }
    recording: file(relativePath: { eq: $recordingURL }) {
      publicURL
    }
    score: file(relativePath: { eq: $scoreURL }) {
      publicURL
    }
  }
`
