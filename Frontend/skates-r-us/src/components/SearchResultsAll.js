import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react"; // Add useState import
import axios from "axios";

function SearchResultsAll({ items, addToCart, user, loading }) {
  const [notification, setNotification] = useState(null); // Track the product ID for the alert

  // Log rendering for debugging
  console.log("SearchResultsAll rendered", { items });

  if (loading) {
    return (
      <div className="container alert alert-secondary mt-3 mb-0">
        <p>Loading items...</p>
      </div>
    );
  }

  // Handle cases where items are undefined or empty
  if (!items || items.length === 0) {
    return (
      <div className="container alert alert-secondary mt-3 mb-0">
        <p>No items found.</p>
      </div>
    );
  }

  console.log("User in SearchResultsAll.js:", user);

  const handleAddToCart = (product) => {
    const addedItemId = addToCart(product); // Call addToCart and get the returned ID
    setNotification(addedItemId); // Set the notification for the product ID
    setTimeout(() => setNotification(null), 1000); // Clear the notification after 1 second
  };
  const RESTOCKBYAMOUNT = 5;
  const handleRestock = async (product) => {
    try {
      const newQuantity = product.quantity + RESTOCKBYAMOUNT;
      await axios.patch(`http://localhost:9000/api/items/${product._id}`, {
        quantity: newQuantity,
      });
      alert(`${product.title} was restocked successfully.`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container alert alert-secondary mt-3 mb-0">
      {/* No Items Found Alert */}
      {!loading && items.length === 0 && (
        <div className="alert alert-warning" role="alert">
          No items found.
        </div>
      )}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {items.map((product) => (
          <div className="col" key={product._id}>
            <div className="card">
              <img
                src={product.picture}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Brand: {product.brand}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Rating: {product.rating} stars</p>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    handleAddToCart(product);
                    console.log("addToCart called with:", product);
                  }} // Pass product to addToCart
                  disabled={!user} // Button is disabled if user is null
                >
                  Add to Cart
                </button>
                {!user ? (
                  <span className="badge bg-warning">
                    Please log in to add items to the cart
                  </span>
                ) : null}
                {notification === product._id && (
                  <div className="alert alert-success mt-2" role="alert">
                    Added to cart!
                  </div>
                )}
                {/* Render Restock button only if the user is admin */}
                {user && user.role === "admin" && (
                  <button
                    type="button"
                    className="btn btn-danger ms-2"
                    onClick={() => handleRestock(product)}
                  >
                    Restock
                  </button>
                )}
                {/* Show high quantities when the user is admin */}
                {user && user.role === "admin" && product.quantity >= 5 && (
                  <span className="badge bg-success">
                    Fully Stocked: {product.quantity} left
                  </span>
                )}
                {/* Show low quantities when the user is logged in */}
                {user && product.quantity >= 1 && product.quantity <= 4 && (
                  <span className="badge bg-warning">
                    Low Stock: {product.quantity} left
                  </span>
                )}
                {/* Show out of stock quantities when the user is logged in */}
                {user && product.quantity == 0 && (
                  <span className="badge bg-danger">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsAll;
