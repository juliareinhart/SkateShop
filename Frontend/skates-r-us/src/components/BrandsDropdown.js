import React, { useState, useEffect } from "react";
import axios from "axios";

function BrandsDropdown({
  onBrandSelect,
  selectedBrands,
  availableBrands,
  availableTypeOfItems,
  availableColors,
  availableRatings,
}) {
  const [error, setError] = useState("");

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the selected brand
      onBrandSelect([...selectedBrands, value]);
    } else {
      // Remove the unselected brand
      onBrandSelect(selectedBrands.filter((brand) => brand !== value));
    }
  };

  return (
    <div className="container mt-2">
      {/* Row with responsive layout for different screen sizes */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {/* Brands Dropdown*/}
        <div className="col">
          <div className="dropdown-center">
            <button
              className="btn btn-secondary dropdown-toggle w-100"
              type="button"
              id="dropdownMenu1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Brand
            </button>
            <ul
              className="dropdown-menu"
              id="brandsDropdown"
              aria-labelledby="dropdownMenu1"
            >
              {/* Options will be populated here dynamically */}
              {availableBrands.map((brand, index) => (
                <li key={index}>
                  <div className="d-flex align-items-center ms-3">
                    <input
                      type="checkbox"
                      className="dropdown-checkbox"
                      name="group1"
                      id={`option1-${index + 1}`}
                      value={brand}
                      onChange={handleCheckboxChange}
                      checked={selectedBrands.includes(brand)} // Sync checked state with parent's state
                    />
                    <label className="ms-2" htmlFor={`option1-${index + 1}`}>
                      {brand}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Type of Items Dropdown 2 */}
        <div className="col">
          <div className="dropdown-center">
            <button
              className="btn btn-secondary dropdown-toggle w-100"
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Type
            </button>
            <ul
              className="dropdown-menu"
              id="typeOfItemsDropdown"
              aria-labelledby="dropdownMenu2"
            >
              {/* Options will be populated here dynamically */}
              {availableTypeOfItems.map((type, index) => (
                <li key={index}>
                  <div className="d-flex align-items-center ms-3">
                    <input
                      type="checkbox"
                      className="dropdown-checkbox"
                      name="group2"
                      id={`type-option-${index + 1}`}
                      value={type}
                    />
                    <label
                      className="ms-2"
                      htmlFor={`type-option-${index + 1}`}
                    >
                      {type}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Colors Dropdown 3 */}
        <div className="col">
          <div className="dropdown-center">
            <button
              className="btn btn-secondary dropdown-toggle w-100"
              type="button"
              id="dropdownMenu3"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Color
            </button>
            <ul
              className="dropdown-menu"
              id="colorsDropdown"
              aria-labelledby="dropdownMenu3"
            >
              {/* Options will be populated here dynamically */}
              {availableColors.map((color, index) => (
                <li key={index}>
                  <div className="d-flex align-items-center ms-3">
                    <input
                      type="checkbox"
                      className="dropdown-checkbox"
                      name="group3"
                      id={`color-option-${index + 1}`}
                      value={color}
                    />
                    <label
                      className="ms-2"
                      htmlFor={`color-option-${index + 1}`}
                    >
                      {color}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Ratings Dropdown */}
        <div className="col">
          <div className="dropdown-center">
            <button
              className="btn btn-secondary dropdown-toggle w-100"
              type="button"
              id="dropdownMenu4"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Rating
            </button>
            <ul
              className="dropdown-menu"
              id="dropdownMenuRating"
              aria-labelledby="dropdownMenu4"
            >
              {/* Options will be populated here dynamically */}
              {availableRatings.map((rating, index) => (
                <li key={index}>
                  <div className="d-flex align-items-center ms-3">
                    <input
                      type="checkbox"
                      className="dropdown-checkbox"
                      name="group3"
                      id={`rating-option-${index + 1}`}
                      value={rating}
                    />
                    <label
                      className="ms-2"
                      htmlFor={`rating-option-${index + 1}`}
                    >
                      {rating} stars
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandsDropdown;
