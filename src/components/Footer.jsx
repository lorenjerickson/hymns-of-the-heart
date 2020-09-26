import React from 'react'

const Footer = () => (
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                <li><a href="https://twitter.com/lorenjerickson" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="https://www.facebook.com/lorenje/" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
                {/* <li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li> */}
                <li><a href="https://github.com/lorenjerickson" className="icon alt fa-github"><span className="label">GitHub</span></a></li>
                <li><a href="#" className="icon alt fa-linkedin"><span className="label">LinkedIn</span></a></li>
            </ul>
            <ul className="copyright">
                <li>&copy; Hymns of the Heart</li><li>Design by <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>
        </div>
    </footer>
)

export default Footer


