import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state passed from Cart.js
  const { cartItems, total, balance, clearCart, updateBalance, user } =
    location.state || {};

  const handlePurchase = () => {
    if (!user) {
      alert("Please log in to proceed.");
      return;
    }

    const newBalance = balance - total;
    if (newBalance < 0) {
      alert("Insufficient balance for this purchase.");
    } else {
      updateBalance(newBalance); // Update the balance in the backend
      clearCart(); // Clear the cart after purchase
      alert("Purchase successful!");
      navigate("/shop"); // Navigate back to the shop
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Checkout</h3>
      <ul className="list-group mb-4">
        {cartItems.map((item, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={index}
          >
            <span>
              {item.title} - ${item.price}
            </span>
          </li>
        ))}
      </ul>
      <p className="fw-bold">Total: ${total.toFixed(2)}</p>
      <p className="fw-bold">Available Balance: ${balance}</p>
      <button className="btn btn-success" onClick={handlePurchase}>
        Confirm Purchase
      </button>
      <button
        className="btn btn-secondary ms-2"
        onClick={() => navigate("/cart")}
      >
        Back to Cart
      </button>
    </div>
  );
}

export default Checkout;
