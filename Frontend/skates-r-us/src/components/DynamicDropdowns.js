import React, { useState, useEffect } from "react";
import axios from "axios";

const DynamicDropdowns = () => {
  const [brands, setBrands] = useState([]);
  const [typeOfItems, setTypeOfItems] = useState([]);
  const [colors, setColors] = useState([]);
  const [ratings, setRatings] = useState([]);

  // Function to fetch options from the backend
  const fetchOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/items/options"
      ); // Adjust endpoint if needed
      const data = response.data;
      setBrands(data.brands);
      setTypeOfItems(data.typeOfItems);
      setColors(data.colors);
      setRatings(data.ratings);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  // Fetch options when the component loads
  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div>
      {/* Brands Dropdown */}
      <ul id="brandsDropdown">
        {brands.map((brand, index) => (
          <li key={index}>
            <div className="d-flex align-items-center ms-3">
              <input
                type="checkbox"
                className="dropdown-checkbox"
                name="group1"
                id={`option1-${index + 1}`}
                value={brand}
              />
              <label className="ms-2" htmlFor={`option1-${index + 1}`}>
                {brand}
              </label>
            </div>
          </li>
        ))}
      </ul>

      {/* Type of Items Dropdown */}
      <ul id="typeOfItemsDropdown">
        {typeOfItems.map((type, index) => (
          <li key={index}>
            <div className="d-flex align-items-center ms-3">
              <input
                type="checkbox"
                className="dropdown-checkbox"
                name="group2"
                id={`type-option-${index + 1}`}
                value={type}
              />
              <label className="ms-2" htmlFor={`type-option-${index + 1}`}>
                {type}
              </label>
            </div>
          </li>
        ))}
      </ul>

      {/* Colors Dropdown */}
      <ul id="colorsDropdown">
        {colors.map((color, index) => (
          <li key={index}>
            <div className="d-flex align-items-center ms-3">
              <input
                type="checkbox"
                className="dropdown-checkbox"
                name="group3"
                id={`color-option-${index + 1}`}
                value={color}
              />
              <label className="ms-2" htmlFor={`color-option-${index + 1}`}>
                {color}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicDropdowns;
