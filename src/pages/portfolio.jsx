import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerLanding from '../components/BannerLanding'

import pic08 from '../assets/images/oldpiano3.jpg'
import pic09 from '../assets/images/oldpiano2.jpg'
import pic10 from '../assets/images/oldpiano.jpg'

const Portfolio = () => (
  <Layout>
    <Helmet>
      <title>Landing - Forty by HTML5 UP</title>
      <meta name="description" content="Landing Page" />
    </Helmet>

    <BannerLanding />

    <div id="main">
      <section>
        <div className="inner">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Item1</td>
                <td>Ante turpis integer aliquet porttitor.</td>
                <td>29.99</td>
              </tr>
              <tr>
                <td>Item2</td>
                <td>Vis ac commodo adipiscing arcu aliquet.</td>
                <td>19.99</td>
              </tr>
              <tr>
                <td>Item3</td>
                <td> Morbi faucibus arcu accumsan lorem.</td>
                <td>29.99</td>
              </tr>
              <tr>
                <td>Item4</td>
                <td>Vitae integer tempus condimentum.</td>
                <td>19.99</td>
              </tr>
              <tr>
                <td>Item5</td>
                <td>Ante turpis integer aliquet porttitor.</td>
                <td>29.99</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" />
                <td>100.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  </Layout>
)

export default Portfolio
