import React from "react"
import { removeUserLoggedInKey } from "../../utils"

const Navbar: React.FC = () => {
  const handleLogoutClick = () => {
    removeUserLoggedInKey()
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      data-cy="navbar"
    >
      <div className="container">
        <a href="#" className="navbar-brand">
          Productivity App
        </a>
        <button
          className="navbar-toggler"
          data-cy="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                href="/"
                className="nav-link"
                aria-label="Home"
                data-cy="nav-link-home"
              >
                Home
              </a>
            </li>
            {/* <li className="nav-item">
              <a href="/dailies" className="nav-link" aria-label="Dailies">
                Dailies
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/weekly-learnings"
                className="nav-link"
                aria-label="Weekly Learnings"
              >
                Weekly Learnings
              </a>
            </li> */}
            <li className="nav-item">
              <a
                href="/"
                className="nav-link"
                onClick={handleLogoutClick}
                data-cy="nav-link-logout"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
