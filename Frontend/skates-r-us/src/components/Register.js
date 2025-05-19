import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Register() {
  const navigate = useNavigate(); // Initialize navigate
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const SECUREADMINPASSWORD = process.env.REACT_APP_ADMIN_PASSWORD; //secure admin password

  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  // State to manage status message
  const [status, setStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdminChange = (e) => {
    if (e.target.checked) {
      setShowAdminPassword(true); // Show the admin password prompt
    } else {
      setShowAdminPassword(false); // Hide the prompt and reset role to "user"
      setFormData({ ...formData, role: "user" });
    }
  };

  const validateAdminPassword = () => {
    if (adminPassword === SECUREADMINPASSWORD) {
      // Replace with your actual password
      setFormData({ ...formData, role: "admin" });
      setStatus("Admin role confirmed!");
      setShowAdminPassword(false); // Hide the admin password input
    } else {
      setStatus("Error: Incorrect admin password.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make POST request to your backend
    axios
      .post("http://localhost:9000/api/user/register", formData) // Replace with your backend endpoint
      .then((response) => {
        console.log("Response:", response.data);
        setStatus("User successfully registered!");
        // Clear input fields
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "user",
        });
        // Delay navigation by 1 second (1000 ms)
        setTimeout(() => {
          navigate("/login");
        }, 1000); // Delay in milliseconds
      })
      .catch((error) => {
        console.error(
          "Error registering user:",
          error.response || error.message
        );
        setStatus("Error: Could not register user. Please try again.");
      });
  };

  return (
    <div className="container">
      <form className="form-signin text-center" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3">User Registration</h1>
        <input
          name="firstName"
          type="text"
          className="form-control mb-3"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          name="lastName"
          type="text"
          className="form-control mb-3"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          autocomplete="email"
          required
        />
        <input
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="form-check mb-3  d-flex align-items-center justify-content-center">
          <input
            className="form-check-input me-2"
            type="checkbox"
            id="adminCheckbox"
            onChange={handleAdminChange}
          />
          <label className="form-check-label" for="adminCheckbox">
            Register as Admin
          </label>
        </div>

        {showAdminPassword && (
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Admin Authorization Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={validateAdminPassword}
            >
              Confirm Admin Role
            </button>
          </div>
        )}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </button>
        {status && <div className="alert alert-info mt-3">{status}</div>}
      </form>
    </div>
  );
}

export default Register;
