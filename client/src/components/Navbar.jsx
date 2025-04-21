import React, { useEffect, useState } from "react";
import logo from "../static/images/logo.webp";
import { getCategory } from "../services/categoryApi";
import { Link } from "react-router-dom";
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
    <div className="mt-5">
      <center>
        <img
          src={logo}
          alt=""
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      </center>
      <div className="container my-3">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg bg-body-tertiary appNavbar sticky-top">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  <i>FashionFlare</i>
                </a>
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
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {categoryList && categoryList.length > 0 && (
                      <>
                        {/* Show first 5 categories */}
                        {categoryList.slice(0, 5).map((element) => (
                          <li className="nav-item" key={element._id}>
                            <Link
                              className="nav-link active"
                              aria-current="page"
                              to={`/${element.categoryName}`}
                            >
                              {element.categoryName.toUpperCase()}
                            </Link>
                          </li>
                        ))}

                        {/* Dropdown for remaining categories */}
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
                                    to={`/${element.categoryName}`}
                                  >
                                    {element.categoryName}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                  <div className="d-flex"></div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
