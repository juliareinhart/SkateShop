// SearchResults.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

function SearchResultsCardSingle() {
  return (
    <div className="col">
      <div className="card">
        <img
          src="${product.picture}"
          className="card-img-top"
          alt="${product.title}"
        />
        <div className="card-body">
          <h5 className="card-title">
            ${"{"}product.title{"}"}
          </h5>
          <p className="card-text">
            Brand: ${"{"}product.brand{"}"}
          </p>
          <p className="card-text">
            Price: ${"{"}product.price{"}"}
          </p>
          <p className="card-text">
            Rating: ${"{"}product.rating{"}"} stars
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchResultsCardSingle;
