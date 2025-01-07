import React, { useState } from "react";
import axios from "axios";

function Cart({
  cartItems,
  user,
  balance,
  updateBalance,
  clearCart,
  saveCartToDB,
  setCartItems,
}) {
  const [alerts, setAlerts] = useState([]); // State to manage alert messages

  const addAlert = (message, type = "danger") => {
    setAlerts((prevAlerts) => [...prevAlerts, { message, type }]);
    setTimeout(() => {
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.message !== message)
      );
    }, 7000);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      addAlert("Please log in to proceed to checkout.");
      return;
    }

    const totalPurchaseAmount = total; // Assuming `total` is the total amount to be deducted from the balance

    // Ensure balance is sufficient before proceeding
    const newBalance = balance - totalPurchaseAmount;
    if (newBalance < 0) {
      addAlert("Insufficient balance to complete the purchase.");
      return;
    }

    let errorMessagesForLowStock = [];
    for (let item of cartItems) {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/items/${item._id}`
        );
        const currentQuantity = response.data.quantity;
        const newQuantity = currentQuantity - item.quantity;

        if (newQuantity >= 0) {
          //move this code in a different section a different map so that quantities only update with boolean flag variable at least one item low stock
          //return axios.patch(`http://localhost:9000/api/items/${item._id}`, {
          //quantity: newQuantity,
          //});
        } else {
          addAlert(
            `Item "${item.title}" is out of stock or insufficient quantity. Current stock: ${currentQuantity}`
          );
          errorMessagesForLowStock.push(
            `Item "${item.title}" is out of stock or insufficient quantity. Current stock: ${currentQuantity}`
          );
          console.log(errorMessagesForLowStock);
          //throw new Error("Insufficient stock for item: " + item.title);
        }
      } catch (error) {
        console.error(error.message);
        break; // stop processing if error occurs
      }
    }

    if (errorMessagesForLowStock.length > 0) {
      console.log(
        "Checkout failed due to stock issues",
        errorMessagesForLowStock
      );
      return;
    }

    // If all items are valid, proceed to update quantities and balance
    for (let item of cartItems) {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/items/${item._id}`
        );
        const currentQuantity = response.data.quantity;
        const newQuantity = currentQuantity - item.quantity;

        // Only update the quantity if the stock is still valid
        if (newQuantity >= 0) {
          console.log(`Quantity updated for item with id ${item._id}`);
          await axios.patch(`http://localhost:9000/api/items/${item._id}`, {
            quantity: newQuantity,
          });
        }
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }

    // Proceed to update balance and clear the cart
    await updateBalance(newBalance);
    addAlert("Purchase successful!", "success");
    clearCart();
  };

  const increaseQuantity = (index) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart); // Update local cart state
    updateCartInBackend(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = cartItems
      .map((item, i) => {
        // Decrease quantity if it matches the index and quantity > 1
        if (i === index) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Handle item removal when quantity reaches 0
            return null; // Mark this item for removal
          }
        }
        return item; // No change for other items
      })
      .filter((item) => item !== null); // Remove null entries

    setCartItems(updatedCart); // Update local cart state
    updateCartInBackend(updatedCart); // Update the backend
  };

  const updateCartInBackend = (updatedCart) => {
    saveCartToDB(updatedCart)
      .then(() => console.log("Cart updated in backend"))
      .catch((err) => console.error("Error updating cart in backend:", err));
  };

  const removeFromCart = (index) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item, i) => i !== index);
      console.log("Updated Cart:", updatedCart); // Debugging
      saveCartToDB(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantityWithValidation = (item) => {
    // Step 1: Fetch the current quantity from the database
    axios
      .get(`http://localhost:9000/api/items/${item._id}`)
      .then((response) => {
        const currentQuantity = response.data.quantity; // Current stock in the database
        const newQuantity = currentQuantity - item.quantity; // Calculate the new quantity

        console.log(`Current Quantity: ${currentQuantity}`);
        console.log(`Requested Quantity: ${item.quantity}`);
        console.log(`New Quantity: ${newQuantity}`);

        // Step 2: Validate that the new quantity is non-negative
        if (newQuantity >= 0) {
          // Step 3: Update the quantity in the database
          return axios.patch(`http://localhost:9000/api/items/${item._id}`, {
            quantity: newQuantity,
          });
        } else {
          // Notify the user that the item is out of stock
          addAlert(
            `Item "${item.title}" is out of stock. Current stock: ${currentQuantity}`
          );
          throw new Error("Insufficient stock.");
        }
      })
      .then((patchResponse) => {
        console.log(
          `Quantity updated successfully for item ${item._id}:`,
          patchResponse.data
        );
      })
      .catch((err) => {
        console.error("Error updating quantity:", err);
      });
  };

  return (
    <div className="container mt-4">
      {user && <p>Available Balance: ${balance.toFixed(2)}</p>}
      <h3 className="mb-4">Shopping Cart</h3>
      {cartItems.length > 0 ? (
        <>
          <ul className="list-group mb-4">
            {cartItems.map((item, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                <span>
                  {item.title} - ${item.price} x {item.quantity}
                </span>
                <div>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => increaseQuantity(index)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => decreaseQuantity(index)}
                  >
                    -
                  </button>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="fw-bold">Total: ${total.toFixed(2)}</p>
          {!user && (
            <p className="text-danger mt-3">
              Please <a href="/login">log in</a> to proceed to checkout.
            </p>
          )}
          <button
            className="btn btn-primary"
            disabled={!user} // Disable if no user is logged in
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </>
      ) : (
        <p className="text-muted">Your cart is empty.</p>
      )}
      <div className="mt-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            {alert.message}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() =>
                setAlerts((prevAlerts) =>
                  prevAlerts.filter((_, i) => i !== index)
                )
              }
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
