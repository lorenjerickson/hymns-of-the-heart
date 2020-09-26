import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import bannerImg from '../assets/images/banner-title.png'
import HomeIcon from '@material-ui/icons/Home';

const Header = props => (
  <header id="header" className="alt">
    <Link to="/" className="logo">
      <HomeIcon />
      <img src={bannerImg} alt="hymns of the heart" />
    </Link>
    {/* <nav>
      <a className="menu-link" onClick={props.onToggleMenu} href="#">
        Menu
      </a>
    </nav> */}
  </header>
)

Header.propTypes = {
  onToggleMenu: PropTypes.func,
}

export default Header
