import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// App.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
//import FilterDropdown from './components/FilterDropdown';
//import PriceSlider from './components/PriceSlider';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Register from "./components/Register";
import AIChat from "./components/AIChat";
import EnableTooltips from "./components/EnableTooltips"; // Import the EnableTooltips component
import axios from "axios";
import Checkout from "./components/Checkout"; // Import Checkout component

function App() {
  //const [results, setResults] = useState([]);
  console.log("loading State");
  //const handleSearch = () => { /* Implement search logic */ };
  //const handleApplyPriceRange = () => { /* Implement price filter logic */ };
  //const handleSelectFilter = (item) => { /* Implement filter logic */ };

  const [cartItems, setCartItems] = useState([]); // Global cart state
  const [user, setUser] = useState(null); // Global user state
  const [balance, setBalance] = useState(null); // Manage user's balance

  // Function to add items to the cart
  const addToCart = (item) => {
    setCartItems((prevCart) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      let updatedCart;

      if (existingItemIndex !== -1) {
        // If item exists, update its quantity
        updatedCart = prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }; // Increment quantity
          }
          return cartItem;
        });
      } else {
        // If item does not exist, add it with quantity 1
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }
      // Attempt to save the cart to the backend
      saveCartToDB(updatedCart)
        .then(() => console.log("Cart saved successfully"))
        .catch((err) => console.error("Error saving cart:", err));
      return updatedCart; // Return the new cart to update the state
    });

    return item._id; // Return the ID of the added item
  };

  console.log("Cart Items:", cartItems); // Debugging to check cart state

  const handleLogout = () => {
    sessionStorage.removeItem("jwt"); // Remove the JWT from sessionStorage
    setUser(null); // Clear the user state
    setCartItems([]); // Clear the cart items
    setBalance(null); // Clear balance
  };

  const fetchCartAndBalance = (id) => {
    const token = sessionStorage.getItem("jwt");
    axios
      .get(`http://localhost:9000/api/user/${id}`)
      .then((response) => {
        setCartItems(response.data.cart); // Set the cart items
        setBalance(response.data.balance); // Set the balance
      })
      .catch((err) => {
        console.error("Error fetching cart and balance:", err);
      });
  };

  const saveCartToDB = (newCart) => {
    const token = sessionStorage.getItem("jwt");
    return axios // Ensure `return` is used here
      .post(
        "http://localhost:9000/api/user/cart",
        { cartItems: newCart }, // Cart data to be saved
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        console.log("Cart saved successfully");
      })
      .catch((err) => {
        console.error("Error saving cart:", err);
      });
  };

  const clearCart = () => {
    const token = sessionStorage.getItem("jwt");
    axios
      .post(
        "http://localhost:9000/api/user/cart/checkout",
        {}, // Empty payload
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setCartItems([]); // Clear local cart state
        console.log("Cart cleared successfully");
      })
      .catch((err) => {
        console.error("Error clearing cart:", err);
      });
  };

  const updateBalance = (newBalance) => {
    const token = sessionStorage.getItem("jwt");
    axios
      .patch(
        `http://localhost:9000/api/user/${user._id}`,
        { balance: newBalance } // Updated balance value}
      )
      .then((response) => {
        setBalance(response.data.balance); // Update local balance state
        console.log(response.data.balance);
        console.log("Balance updated successfully");
      })
      .catch((err) => {
        console.error("Error updating balance:", err);
      });
  };

  return (
    <Router>
      <EnableTooltips /> {/* Initialize Bootstrap tooltips */}
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            <Login
              setUser={setUser}
              fetchCartAndBalance={fetchCartAndBalance}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        {/* Delegate shop-related routes to Shop, what the * means that anything not provided here will go to shop */}
        <Route
          path="/*"
          element={
            <Shop
              addToCart={addToCart}
              user={user}
              balance={balance}
              saveCartToDB={saveCartToDB}
              fetchCartAndBalance={fetchCartAndBalance}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              user={user}
              balance={balance}
              clearCart={clearCart}
              updateBalance={updateBalance}
              saveCartToDB={saveCartToDB}
              setCartItems={setCartItems}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              balance={balance}
              user={user}
              clearCart={clearCart}
              updateBalance={updateBalance}
            />
          }
        />
        <Route path="/AIChat" element={<AIChat />} />
      </Routes>
    </Router>
  );
}

export default App;
