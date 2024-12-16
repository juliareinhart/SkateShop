import axios from "axios";
import buildQueryString from "./buildQueryString"; // Import the query string builder

/**
 * Makes an API call to filter items based on the given filters.
 * @param {Object} filters - The filters to apply (e.g., price, searchTerm, etc.)
 * @returns {Promise} - A Promise resolving to the API response data
 */
function applyFilters(filters) {
  return new Promise((resolve, reject) => {
    const queryString = buildQueryString(filters); // Build query string

    console.log("Applying filters with query:", queryString);

    axios
      .get(`http://localhost:9000/api/items${queryString}`) // Adjust the endpoint to match your API
      .then((response) => {
        resolve(response.data);
        console.log(response.data);
      })
      .catch((error) => reject(error));
  });
}

export default applyFilters;
