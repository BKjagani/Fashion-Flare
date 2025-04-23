import React, { useEffect, useState } from "react";
import logo from "../static/images/logo.webp";
import { getCategory } from "../services/categoryApi";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { FaShoppingCart, FaClipboardList } from "react-icons/fa"; // Using react-icons for cart icon
import { BsCardChecklist } from "react-icons/bs";

function Navbar() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      const response = await getCategory();
      setCategoryList(response);
    }
    fetchCategory();
  }, []);

  return (
    <>
      {/* Logo */}
      <center>
        <img
          src={logo}
          alt="logo"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      </center>

      {/* Sticky Navbar */}
      <nav
        className="navbar navbar-expand-lg sticky-top appNavbar"
        style={{
          backgroundColor: "#fcf5f3",
          zIndex: 1020,
          borderBottom: "1px solid #ddd",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i>FashionFlare</i>
          </Link>
          <Link className="navbar-brand" to="/about">
            <i>About</i>
          </Link>
          <Link className="navbar-brand" to="/categories">
            <i>Categories</i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Category links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {categoryList.slice(0, 5).map((element) => (
                <li className="nav-item" key={element._id}>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={`/categories/${element.categoryName}`}
                    style={{ color: "#470c19" }}
                  >
                    {element.categoryName.toUpperCase()}
                  </Link>
                </li>
              ))}

              {categoryList.length > 5 && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </a>
                  <ul className="dropdown-menu">
                    {categoryList.slice(5).map((element) => (
                      <li key={element._id}>
                        <Link
                          className="dropdown-item"
                          to={`/categories/${element.categoryName}`}
                          style={{ color: "#470c19" }}
                        >
                          {element.categoryName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>

            {/* Right Side: Cart + Auth */}
            <div className="d-flex align-items-center gap-3">
              {/* Cart Icon */}
              <Link to="/orders" className="text-decoration-none" style={{color : "#fff"}}>
                <FaClipboardList size={22} color="#ee4467" />
              </Link>
              <Link to="/cart" className="text-decoration-none">
                <FaShoppingCart size={22} color="#921936" />
              </Link>

              {/* Auth Buttons */}
              <SignedOut>
                <SignInButton>
                  <div
                    className="btn"
                    style={{ backgroundColor: "#470c19", color: "white" }}
                  >
                    Signin
                  </div>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
