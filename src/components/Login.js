import React, { useState } from "react"; // Import useState hook from React
import "./Login.css"; // Import Login CSS

const Login = ({ onLogin }) => {
  // Define state variables using useState hook
  const [username, setUsername] = useState(""); // State to store the username
  const [password, setPassword] = useState(""); // State to store the password
  const [message, setMessage] = useState(""); // State to store messages (e.g., success or error messages)

  // Function to validate the form
  const validateForm = () => {
    if (!username || !password) {
      setMessage("Both username and password are required"); // Set error message if fields are empty
      return false; // Return false if validation fails
    }
    return true; // Return true if validation passes
  };

  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!validateForm()) {
      return; // If form validation fails, stop execution
    }

    // Send a POST request to the server to log in the user
    fetch("http://localhost:5000/login", {
      method: "POST", // Use POST method to send login data
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ username, password }), // Send the username and password in the request body
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        if (data.message === "Login successful") {
          // Check if login is successful
          localStorage.setItem("user", JSON.stringify(data.user)); // Store user information in localStorage
          onLogin(); // Call the onLogin callback
          setMessage("Login successful"); // Set success message
        } else {
          setMessage("Login failed"); // Set error message if login fails
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors that occur
        setMessage("An error occurred. Please try again."); // Set error message if an error occurs
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1> {/* Form heading */}
      {message && <div className="alert alert-info">{message}</div>}{" "}
      {/* Display messages if any */}
      <form onSubmit={handleLogin}>
        {/* Username input */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update the username state when the input changes
            required // Make the field required
          />
        </div>
        {/* Password input */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update the password state when the input changes
            required // Make the field required
          />
        </div>
        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
