import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Helmet from 'react-helmet'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css' // This only needs to be imported once in your app

const CompositionTemplate = ({ data }) => {
  const { markdownRemark, cover, recording, score } = data
  const { frontmatter, html } = markdownRemark

  const pages = [cover.publicURL]

  const [showPages, setShowPages] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)

  const handlePagesClick = () => {
    setShowPages(true)
  }

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title} - Hymns of the Heart</title>
        <meta name="description" content="Generic Page" />
      </Helmet>

      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>{frontmatter.title}</h1>
            </header>

            <div className="flex row">
              <div className="left">
                <div className="image thumbnail" onClick={handlePagesClick}>
                  <div className="small padding">(click to expand)</div>
                  <img src={cover.publicURL} alt={frontmatter.title} />
                </div>
                <div className="audio margin">
                  <audio controls preload="auto">
                    <source src={recording.publicURL} type="audio/mp3" />
                  </audio>
                </div>
                <div className="meta small padding">
                  <div className="tiny">Tags</div>
                  {frontmatter.tags.map((tag, index) => (
                    <Link to={`/tags/${tag}`} key={`tag-${index}`}>
                      {tag}
                    </Link>
                  ))}
                </div>

                <div className="meta small padding">
                  <div className="tiny">Topics</div>
                  {frontmatter.topics.map((top, index) => (
                    <Link to={`/topics/${top}`} key={`top-${index}`}>
                      {top}
                    </Link>
                  ))}
                </div>
                <div className="downloads small padding">
                  <div className="tiny">Downloads</div>
                  <div>
                    <span className="icon fa-file-pdf-o" />
                    {` `}
                    <a href={score.publicURL} download>
                      {frontmatter.title} (score)
                    </a>
                  </div>

                  <div>
                    <span className="icon fa-music" />
                    {` `}
                    <a href={recording.publicURL} download>
                      {frontmatter.title} (audio)
                    </a>
                  </div>

                  <div>
                    <span className="icon fa-youtube-play" />
                    {` `}
                    <a
                      href={`https://www.youtube.com/watch?v=${frontmatter.videoID}`}
                      target="_blank"
                    >
                      {frontmatter.title} (video)
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="content grow padded more"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </div>

            <div>
              {showPages && (
                <Lightbox
                  mainSrc={pages[pageIndex]}
                  nextSrc={pages[(pageIndex + 1) % pages.length]}
                  prevSrc={pages[(pageIndex + pages.length - 1) % pages.length]}
                  onCloseRequest={() => setShowPages(false)}
                  onMovePrevRequest={() =>
                    setPageIndex((pageIndex + pages.length - 1) % pages.length)
                  }
                  onMoveNextRequest={() =>
                    setPageIndex((pageIndex + 1) % pages.length)
                  }
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default CompositionTemplate

export const pageQuery = graphql`
  query compositionTemplateQuery(
    $slug: String!
    $coverPath: String!
    $recordingPath: String!
    $scorePath: String!
  ) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        tags
        topics
        videoID
      }
    }
    cover: file(relativePath: { eq: $coverPath }) {
      publicURL
    }
    recording: file(relativePath: { eq: $recordingPath }) {
      publicURL
    }
    score: file(relativePath: { eq: $scorePath }) {
      publicURL
    }
  }
`
