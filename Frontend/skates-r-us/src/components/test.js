import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

function SearchResultsAll({
  items,
  addToCart,
  user,
  loading,
  cartItems,
  removeAllFromCart, // Function to remove all items of a product from the cart
  updateItemQuantity,
}) {
  const [notification, setNotification] = useState(null);
  const [disabledButton, setDisabledButton] = useState(null); // Track disabled buttons
  const [restockNotification, setRestockNotification] = useState(null);

  if (loading) {
    return (
      <div className="container alert alert-secondary mt-3 mb-0">
        <p>Loading items...</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="container alert alert-secondary mt-3 mb-0">
        <p>No items found.</p>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    const addedItemId = addToCart(product);
    setNotification(addedItemId);
    setDisabledButton(product._id); // Temporarily disable the button
    setTimeout(() => {
      setNotification(null);
      setDisabledButton(null);
    }, 1000); // Clear the disabled state after 1 second
  };

  const handleRestock = async (product) => {
    try {
      const newQuantity = product.quantity + 5;
      await axios.patch(`http://localhost:9000/api/items/${product._id}`, {
        quantity: newQuantity,
      });

      updateItemQuantity(product._id, newQuantity);
      setRestockNotification(product._id);
      setTimeout(() => setRestockNotification(null), 1000);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item._id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="container alert alert-secondary mt-3 mb-0">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {items.map((product) => {
          const cartQuantity = getCartQuantity(product._id);

          return (
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
                    onClick={() => handleAddToCart(product)}
                    disabled={!user || disabledButton === product._id} // Disable button for 1 second after click
                  >
                    {disabledButton === product._id
                      ? "Adding..."
                      : "Add to Cart"}
                  </button>
                  {cartQuantity > 0 && (
                    <div className="mt-2">
                      <span className="badge bg-primary">
                        In Cart: {cartQuantity}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={() => removeAllFromCart(product._id)}
                      >
                        Remove All
                      </button>
                    </div>
                  )}
                  {!user && (
                    <span className="badge bg-warning">
                      Please log in to add items to the cart
                    </span>
                  )}
                  {notification === product._id && (
                    <div className="alert alert-success mt-2" role="alert">
                      Added to cart!
                    </div>
                  )}
                  {restockNotification === product._id && (
                    <div className="alert alert-success mt-2" role="alert">
                      Item Restocked.
                    </div>
                  )}
                  {user && user.role === "admin" && (
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => handleRestock(product)}
                    >
                      Restock
                    </button>
                  )}
                  {user && user.role === "admin" && product.quantity >= 5 && (
                    <span className="badge bg-success">
                      Fully Stocked: {product.quantity} left
                    </span>
                  )}
                  {user && product.quantity >= 1 && product.quantity <= 4 && (
                    <span className="badge bg-warning">
                      Low Stock: {product.quantity} left
                    </span>
                  )}
                  {user && product.quantity === 0 && (
                    <span className="badge bg-danger">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResultsAll;
