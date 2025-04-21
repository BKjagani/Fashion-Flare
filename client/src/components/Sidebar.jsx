import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="sidebar p-3"
      style={{
        height: "100vh",
        overflowY: "auto",
        position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        borderRight: "1px solid #ddd",
      }}
    >
      <div className="sidebar-header h4 mb-4">Admin Dashboard</div>
      <ul className="nav flex-column">
        {/* Dashboard Link */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/admin"
          >
            Dashboard
          </NavLink>
        </li>

        {/* User */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/admin/users/list"
          >
            User List
          </NavLink>
        </li>

        {/* Product Dropdown */}
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#productMenu"
            role="button"
            aria-expanded="false"
            aria-controls="productMenu"
          >
            Product
          </a>
          <div className="collapse" id="productMenu">
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/admin/products/add"
                >
                  Add Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/admin/products/list"
                >
                  Product List
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        {/* Category Dropdown */}
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#categoryMenu"
            role="button"
            aria-expanded="false"
            aria-controls="categoryMenu"
          >
            Category
          </a>
          <div className="collapse" id="categoryMenu">
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/admin/categories/add"
                >
                  Add Category
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/admin/categories/list"
                >
                  Category List
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
