// SearchBar.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Range } from "react-range";
import applyFilters from "../utils/applyFilters"; // Import the applyFilters utility
import SearchResultsAll from "./SearchResultsAll";
import BrandsDropdown from "./BrandsDropdown";
import { useState, useEffect } from "react"; // Add `useEffect`
import axios from "axios";

function FilterAll({ addToCart, user }) {
  console.log("User in PriceFilter.js:", user); // Debugging
  const [values, setValues] = useState([40, 300]);
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items from web service
  const [selectedBrands, setSelectedBrands] = useState([]); // Selected brands
  const [selectedTypeOfItems, setSelectedTypeOfItems] = useState([]); // Selected brands
  const [selectedColors, setSelectedColors] = useState([]); // Selected brands
  const [selectedRatings, setSelectedRatings] = useState([]); // Selected brands
  const [error, setError] = useState(""); // For handling errors
  const [loading, setLoading] = useState(true); // Track loading state
  const [availableBrands, setAvailableBrands] = useState([]); // Store available brands
  const [availableTypeOfItems, setAvailableTypeOfItems] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableRatings, setAvailableRatings] = useState([]);

  const STEP = 1;
  const MIN = 40;
  const MAX = 300;

  // Fetch items based on the current price range
  const fetchItems = (priceRange = values) => {
    const filters = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      selectedBrands,
      selectedTypeOfItems,
      selectedColors,
      selectedRatings,
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

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true); // Start loading
        await fetchItems(values); // Fetch initial items
        await fetchAvailableOptions(
          `minPrice=${values[0]}&maxPrice=${values[1]}`
        ); // Fetch initial dropdown options
      } catch (error) {
        console.error("Error initializing data:", error);
        setError("An error occurred while loading data."); // Handle error
      } finally {
        setLoading(false); // End loading
      }
    };

    initializeData(); // Call the async function
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    fetchItems(); // Fetch items whenever price range or selected brands change
  }, [selectedBrands, selectedTypeOfItems, selectedColors, selectedRatings]);

  // Handle Go Button Click
  const handleGoClick = async () => {
    await fetchItems(values);
    await fetchAvailableOptions(`minPrice=${values[0]}&maxPrice=${values[1]}`); // Fetch available options based on price range
  };

  // Update selected brands when changed in BrandsDropdown
  const handleBrandSelect = (brands) => {
    setSelectedBrands(brands); // Update the selected brands
  };

  // Update selected brands when changed in BrandsDropdown
  const handleTypeOfItemSelect = (typeOfItems) => {
    setSelectedTypeOfItems(typeOfItems); // Update the selected brands
  };

  // Update selected brands when changed in BrandsDropdown
  const handleColorSelect = (colors) => {
    setSelectedColors(colors); // Update the selected brands
  };

  // Update selected brands when changed in BrandsDropdown
  const handleRatingSelect = (ratings) => {
    setSelectedRatings(ratings); // Update the selected brands
  };

  // Function to fetch options from the backend
  const fetchAvailableOptions = async (filters) => {
    try {
      // Build the query string manually
      const queryString = `?${new URLSearchParams(filters).toString()}`;
      const response = await axios.get(
        `http://localhost:9000/api/items/options${queryString}`
      ); // Adjust endpoint if needed
      const data = response.data;
      setAvailableBrands(data.brands);
      setAvailableTypeOfItems(data.typeOfItems);
      setAvailableColors(data.colors);
      setAvailableRatings(data.ratings);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
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
        onTypeOfItemSelect={setSelectedTypeOfItems}
        selectedTypeOfItems={selectedTypeOfItems}
        onColorSelect={setSelectedColors}
        selectedColors={selectedColors}
        onRatingSelect={setSelectedRatings}
        selectedRatings={selectedRatings}
        availableBrands={availableBrands}
        availableTypeOfItems={availableTypeOfItems}
        availableColors={availableColors}
        availableRatings={availableRatings}
      />
      {/* Display Error Message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {/* Render Search Results */}
      {loading ? (
        <div className="container alert alert-secondary mt-3 mb-0">
          <p>Loading items...</p>
        </div>
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
