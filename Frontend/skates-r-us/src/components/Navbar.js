// Navbar.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar bg-body-tertiary ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Skates R Us
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Skates R Us
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <>
                    <span className="nav-link">Welcome, {user.firstName}</span>{" "}
                    {/* Display user email */}
                    <button
                      className="btn btn-link nav-link"
                      onClick={onLogout}
                      style={{ textDecoration: "none" }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
