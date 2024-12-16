// SearchBar.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function SearchBar() {
  return (
    <div className="container alert alert-light mt-3">
      <form>
        <div className="row g-2 ">
          <div className="col-sm-9">
            <input
              id="searchTerm"
              type="text"
              className="form-control"
              placeholder="Enter an item name to search"
            />
          </div>
          <div className="col-sm-3">
            <button
              id="searchBtn"
              type="button"
              className="btn btn-primary form-control"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
