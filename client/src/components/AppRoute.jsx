import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import ProductByCategory from "../pages/ProductByCategory";
import ProductView from "../pages/ProductView";
import Cart from "../pages/Cart";
import Success from "./Success";
import MyOrders from "../pages/MyOrders";
import Footer from "./Footer";
import Categories from "../pages/Categories";
import About from "./About";

function AppRoute() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:categoryName" element={<ProductByCategory/>}/>
        <Route path="/productview/:id" element={<ProductView/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/orders" element={<MyOrders/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default AppRoute;
