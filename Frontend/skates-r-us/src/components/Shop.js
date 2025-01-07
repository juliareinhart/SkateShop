// Navbar.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SearchBar from "./SearchBar";
import FilterAll from "./FilterAll";
//import FilterDropdown from './components/FilterDropdown';
//import PriceSlider from './components/PriceSlider';
import SearchResultsAll from "./SearchResultsAll";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";

function Shop({ addToCart, user, cartItems }) {
  console.log("User in Shop.js:", user);

  return (
    <div>
      <Routes>
        {/* Route for Shop */}
        <Route
          path="/shop"
          element={
            <FilterAll
              addToCart={addToCart}
              user={user}
              cartItems={cartItems}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Shop;
