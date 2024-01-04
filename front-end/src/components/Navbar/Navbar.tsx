import React from "react"

const Navbar: React.FC = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      data-cy="app-navbar"
    >
      <div className="container">
        <a href="#" className="navbar-brand">
          Productivity App
        </a>
        <button
          className="navbar-toggler"
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
              <a href="/" className="nav-link">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a href="/dailies" className="nav-link">
                Dailies
              </a>
            </li>
            <li className="nav-item">
              <a href="/weekly-learnings" className="nav-link">
                Weekly Learnings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
