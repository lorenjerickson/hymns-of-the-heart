import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ currentPage, numPages }) => (
  <ul className="pagination">
    <li>
      <Link
        to={`/portfolio/${currentPage === 2 ? '' : currentPage - 1}`}
        className={`button small ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <span>Prev</span>
      </Link>
    </li>

    {Array.from({ length: numPages }, (_, i) => (
      <li key={`portfolio-${i + 1}`}>
        <Link
          to={`/portfolio/${i === 0 ? '' : i + 1}`}
          className={`page ${currentPage === i + 1 ? 'active' : ''}`}
        >
          {i + 1}
        </Link>
      </li>
    ))}

    <li>
      <Link
        to={`/portfolio/${currentPage + 1}`}
        className={`button small ${currentPage === numPages ? 'disabled' : ''}`}
      >
        <span>Next</span>
      </Link>
    </li>
  </ul>
)

export default Pagination;
