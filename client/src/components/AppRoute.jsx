import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import ProductByCategory from "../pages/ProductByCategory";
import ProductView from "../pages/ProductView";
import Cart from "../pages/Cart";

function AppRoute() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:categoryName" element={<ProductByCategory/>}/>
        <Route path="/productview/:id" element={<ProductView/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default AppRoute;
