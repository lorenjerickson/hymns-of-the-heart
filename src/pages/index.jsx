import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

import littleOne from '../assets/portfolio/little-one.png'
import orchestral from '../assets/portfolio/a-prayer-to-my-father-orchestral.png'
import oratorios from '../assets/portfolio/the-restoration-11-carthage.png'
import mixedChoir from '../assets/portfolio/a-poor-wayfaring-man-of-grief.png'
import acapella from '../assets/portfolio/brightly-beams-our-fathers-mercy.png'
import hymns from '../assets/portfolio/all-praise-to-our-redeeming-lord.png'
import Banner from '../components/Banner'


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
              <Link to="/mixed-choir" className="link primary" />
            </article>
            <article style={{ backgroundImage: `url(${acapella})` }}>
              <header className="major">
                <h3>a Capella Choir</h3>
                <p>
                  Unaccompanied arrangements for mixed, men's and women's
                  choirs.
                </p>
              </header>
              <Link to="/a-capella" className="link primary" />
            </article>
            <article style={{ backgroundImage: `url(${orchestral})` }}>
              <header className="major">
                <h3>Orchestral</h3>
                <p>
                  Sacred music at it's biggest: compositions written for
                  symphony orchestra and large choir.
                </p>
              </header>
              <Link to="/orchestral" className="link primary" />
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
              <Link to="/children" className="link primary" />
            </article>
            <article style={{ backgroundImage: `url(${hymns})` }}>
              <header className="major">
                <h3>Hymns</h3>
                <p>
                  Simple four part compositions for any choir or congregation.
                </p>
              </header>
              <Link to="/hymns" className="link primary" />
            </article>
            <article style={{ backgroundImage: `url(${oratorios})` }}>
              <header className="major">
                <h3>Oratorios</h3>
                <p>
                  Large scale orchestral and choral works celebrating Jesus
                  Christ and modern day prophets.{' '}
                </p>
              </header>
              <Link to="/oratorios" className="link primary" />
            </article>
          </section>

          <section id="banner" className="major alt bottom">
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
          </section>
        </div>
      </Layout>
    )
  }
}

export default HomeIndex
