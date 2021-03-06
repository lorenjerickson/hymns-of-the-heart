import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/banner'

import littleOne from '../assets/portfolio/little-one/little-one-01.png'
import orchestral from '../assets/portfolio/a-prayer-to-my-father-orchestral/a-prayer-to-my-father-orchestral-01.png'
import oratorios from '../assets/portfolio/the-restoration-11-carthage/the-restoration-11-carthage-01.png'
import mixedChoir from '../assets/portfolio/a-poor-wayfaring-man-of-grief/a-poor-wayfaring-man-of-grief-01.png'
import acapella from '../assets/portfolio/brightly-beams-our-fathers-mercy/brightly-beams-our-fathers-mercy-01.png'
import hymns from '../assets/portfolio/all-praise-to-our-redeeming-lord/all-praise-to-our-redeeming-lord-01.png'


class HomeIndex extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet
          title="Hymns of the Heart"
          meta={[
            {
              name: 'description',
              content:
                'a simple place on the web for sharing my efforts in sacred Christian music arranging and composition.',
            },
            {
              name: 'keywords',
              content:
                'christian, music, composition, arranging, choral, orchestral',
            },
          ]}
        />

        <Banner />

        <div id="main">
          <section id="one" className="tiles">
            <article style={{ backgroundImage: `url(${mixedChoir})` }}>
              <header className="major">
                <h3>Accompanied Mixed Choir</h3>
                <p>
                  Arrangements and original compositions for Mixed Choir
                  accompanied by Piano or Organ.
                </p>
              </header>
              <Link to="/tags/mixed-choir" className="link primary" />
            </article>
            <article style={{ backgroundImage: `url(${acapella})` }}>
              <header className="major">
                <h3>a Capella Choir</h3>
                <p>
                  Unaccompanied arrangements for mixed, men's and women's
                  choirs.
                </p>
              </header>
              <Link to="/tags/a-capella" className="link primary" />
            </article>
            <article style={{ backgroundImage: `url(${orchestral})` }}>
              <header className="major">
                <h3>Orchestral</h3>
                <p>
                  Sacred music at it's biggest: compositions written for
                  symphony orchestra and large choir.
                </p>
              </header>
              <Link to="/tags/orchestral" className="link primary" />
            </article>
            <article
              style={{
                backgroundImage: `url(${littleOne})`,
                backgroundSize: `100% auto`,
              }}
            >
              <header className="major">
                <h3>For Children</h3>
                <p>Simple music that teach fundamental Gospel principles.</p>
              </header>
              <Link to="/tags/children" className="link primary" />
            </article>
            <article style={{ backgroundImage: `url(${hymns})` }}>
              <header className="major">
                <h3>Hymns</h3>
                <p>
                  Simple four part compositions for any choir or congregation.
                </p>
              </header>
              <Link to="/tags/hymn" className="link primary" />
            </article>
            <article style={{ backgroundImage: `url(${oratorios})` }}>
              <header className="major">
                <h3>Oratorios</h3>
                <p>
                  Large scale orchestral and choral works celebrating Jesus
                  Christ and modern day prophets.{' '}
                </p>
              </header>
              <Link to="/tags/oratorios" className="link primary" />
            </article>
          </section>

          {/* <section id="banner" className="major alt bottom">
            <div className="inner">
              <header>
                <h2>One Man</h2>
              </header>
              <div className="content">
                <p>
                  My magnum opus. An epic original work focusing on the
                  crucifixion of Jesus Christ.
                </p>
                <ul className="actions">
                  <li>
                    <a className="button special" href="/compositions/one-man">
                      Learn More
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section> */}
        </div>
      </Layout>
    )
  }
}

export default HomeIndex
