// SearchBar.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Range } from "react-range";
import applyFilters from "../utils/applyFilters"; // Import the applyFilters utility
import SearchResultsAll from "./SearchResultsAll";
import BrandsDropdown from "./BrandsDropdown";
import { useState, useEffect } from "react"; // Add `useEffect`

function FilterAll({ addToCart, user }) {
  console.log("User in PriceFilter.js:", user); // Debugging
  const [values, setValues] = useState([40, 300]);
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items from web service
  const [selectedBrands, setSelectedBrands] = useState([]); // Selected brands
  const [error, setError] = useState(""); // For handling errors
  const [loading, setLoading] = useState(true); // Track loading state

  const STEP = 1;
  const MIN = 40;
  const MAX = 300;

  // Fetch items based on the current price range
  const fetchItems = (priceRange = values) => {
    const filters = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      selectedBrands,
    };

    console.log("Filters being sent to applyFilters:", filters); // Debug the filters object

    setLoading(true); // Set loading to true before fetching items

    return applyFilters(filters) //need to return a promise so that can use finally to set loading state to false
      .then((data) => {
        console.log("Data received from applyFilters:", data); // Debug the API response
        setFilteredItems(data);
        setError("");
      })
      .catch((err) => {
        console.error("Error in applyFilters:", err);
        setError("An error occurred while fetching filtered items."); // Ensure loading is false after fetch
      })
      .finally(() => {
        setLoading(false);
        console.log("Loading state set to false"); // Debug loading state
      });
  };

  // Fetch default items within the price range when the component loads
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching items
    fetchItems(values).finally(() => setLoading(false)); // Ensure loading is false after fetch;
  }, []);

  useEffect(() => {
    fetchItems(); // Fetch items whenever price range or selected brands change
  }, [values, selectedBrands]);

  // Handle Go Button Click
  const handleGoClick = () => {
    fetchItems(values);
  };

  // Update selected brands when changed in BrandsDropdown
  const handleBrandSelect = (brands) => {
    setSelectedBrands(brands); // Update the selected brands
  };

  console.log("addToCart passed to SearchResultsAll:", addToCart);

  console.log("User in Shop.js:", user);

  return (
    <div className="container alert alert-light mt-3">
      <form>
        <div className="row g-4 mt-3 mb-3">
          <div className="col-sm-9 mt-4">
            <Range
              values={values}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => setValues(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    background:
                      "linear-gradient(to right, #ccc, #007bff, #ccc)",
                    borderRadius: "3px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "20px",
                    width: "20px",
                    backgroundColor: "#007bff",
                    borderRadius: "50%",
                  }}
                />
              )}
            />
            <div className="d-flex justify-content-between mt-3">
              <span>Min: ${values[0]}</span>
              <span>Max: ${values[1]}</span>
            </div>
          </div>
          <div className="col-sm-3 mt-3">
            <button
              type="button"
              className="btn btn-primary form-control"
              onClick={handleGoClick}
            >
              Go
            </button>
          </div>
        </div>
      </form>
      <BrandsDropdown
        onBrandSelect={setSelectedBrands}
        selectedBrands={selectedBrands}
      />
      {/* Display Error Message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {/* Render Search Results */}
      {loading ? (
        <p>Loading items...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <SearchResultsAll
          items={filteredItems}
          addToCart={addToCart}
          user={user}
          loading={loading}
        />
      )}
    </div>
  );
}

export default FilterAll;
