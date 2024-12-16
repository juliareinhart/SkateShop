// Navbar.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SearchBar from "./SearchBar";
import PriceFilter from "./PriceFilter";
//import FilterDropdown from './components/FilterDropdown';
//import PriceSlider from './components/PriceSlider';
import SearchResultsAll from "./SearchResultsAll";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";

function Shop({ addToCart, user }) {
  console.log("User in Shop.js:", user);

  return (
    <div>
      <Routes>
        {/* Route for Shop */}
        <Route
          path="/shop"
          element={<PriceFilter addToCart={addToCart} user={user} />}
        />
      </Routes>
    </div>
  );
}

export default Shop;
