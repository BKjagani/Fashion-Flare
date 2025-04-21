import React from "react";
import { Routes, Route } from "react-router-dom";
import AddCategory from "./AddCategory"; // Add Category Page
import AdminPage from "./Admin"; // Admin Dashboard Page
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import AddProduct from "./AddProduct";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";

function AdminRoute() {
  return (
    <div className="admin-page-container">
      <Sidebar />
      <div
        className="content-container"
        style={{ marginLeft: "0px", width: "100%" }}
      >
        <AdminNavbar />
        <div className="container mt-4">
          {/* Nested routes */}
          <Routes>
            <Route path="/" element={<AdminPage />} /> {/* Admin Dashboard */}
            <Route path="categories/add" element={<AddCategory />} />{" "}
            <Route path="categories/list" element={<CategoryList />} />{" "}
            <Route path="products/add" element={<AddProduct />} />{" "}
            <Route path="products/list" element={<ProductList />} />{" "}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminRoute;
