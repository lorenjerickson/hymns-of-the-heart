import React from 'react'
import { Link } from 'gatsby'

// import oldpiano from '../assets/images/oldpiano.jpg'
import pic02 from '../assets/images/pic02.jpg'

const Banner = () => (
  <section
    id="banner"
    className="major"
    style={{ backgroundImage: `${pic02}`, backgroundSize: `100% 100%` }}
  >
    <div className="inner">
      <header className="major">
        <h1 style={{ fontFamily: 'Allura' }}>Hymns of the Heart</h1>
      </header>
      <div className="content">
        <p>
          A simple place on the web for sharing my efforts in sacred Christian
          music arranging and composition.
        </p>
        <ul className="actions">
          <li>
            <Link className="button special" to="/portfolio">
              My Portfolio
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </section>
)

export default Banner
