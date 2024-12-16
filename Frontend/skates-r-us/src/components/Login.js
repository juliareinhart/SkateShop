import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login({ setUser, fetchCartAndBalance }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(""); // For displaying success/error messages
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    axios
      .post("http://localhost:9000/api/user/login", formData) // Replace with your backend login endpoint
      .then((response) => {
        // Store the JWT in sessionStorage
        const token = response.data.jwt;
        sessionStorage.setItem("jwt", token);

        console.log(response.data);
        console.log("Token being sent:", token);
        // Decode the JWT to get user information
        const decodedToken = jwtDecode(token); // Decode the token
        console.log("Decoded Token:", decodedToken); // For debugging

        const { _id, firstName, balance, role } = decodedToken; // Extract firstName and balance from token

        // Step 3: Update global user state
        setUser({ _id, firstName, balance, role });

        console.log("setUser in Login.js:", setUser);
        console.log("fetchCartAndBalance in Login.js:", fetchCartAndBalance);

        fetchCartAndBalance(decodedToken._id); // Fetch cart and balance from the backend
        // Step 4: Update status to indicate success
        setStatus("Login successful!");

        // Delay navigation by 1 second (1000 ms)
        setTimeout(() => {
          navigate("/shop");
        }, 1000); // Delay in milliseconds
      })
      .catch((error) => {
        // Handle login error
        console.error("Login error:", error.response || error.message);
        setStatus("Login failed. Please check your email and password.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {status && <div className="alert alert-info">{status}</div>}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mb-3">
                Login
              </button>
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
