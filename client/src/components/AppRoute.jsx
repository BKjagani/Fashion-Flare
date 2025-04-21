import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Navbar from "./Navbar";

function AppRoute() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default AppRoute;
