import React from 'react'

const bannerLanding = ({ title, description }) => (
  <section id="banner" className="style2">
    <div className="inner">
      <header className="major">
        <h1>{title}</h1>
      </header>
      <div className="content">
        <p>{description}</p>
      </div>
    </div>
  </section>
)

export default bannerLanding
