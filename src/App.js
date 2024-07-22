import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  // State to track the number of items in the cart
  const [cartCount, setCartCount] = useState(0);

  // Fetch initial cart count from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((response) => response.json())
      .then((data) => {
        // Set the cart count to the number of items in the cart
        setCartCount(data.length);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  // Function to update the cart count
  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <Router>
      <div>
        {/* Pass the cart count to the Navbar component */}
        <Navbar cartCount={cartCount} />
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              exact
              element={<Home updateCartCount={updateCartCount} />}
            />
            <Route
              path="/products"
              element={<Products updateCartCount={updateCartCount} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetail updateCartCount={updateCartCount} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
