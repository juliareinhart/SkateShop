/**
 * Constructs a query string from the given filters.
 * @param {Object} filters - The filters to include in the query string
 * @returns {string} - The query string to append to the API URL
 */
function buildQueryString(filters) {
  const params = new URLSearchParams();

  if (filters.searchTerm) {
    params.append("search", filters.searchTerm);
  }
  if (filters.minPrice) {
    params.append("minPrice", filters.minPrice);
  }
  if (filters.maxPrice) {
    params.append("maxPrice", filters.maxPrice);
  }
  if (filters.selectedBrands && filters.selectedBrands.length > 0) {
    filters.selectedBrands.forEach((brand) => params.append("brand", brand));
  }

  return params.toString() ? `?${params.toString()}` : "";
}

export default buildQueryString;
