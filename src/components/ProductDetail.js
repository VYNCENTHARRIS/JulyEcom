import React, { useState, useEffect } from "react"; // Import hooks from React
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Button,
} from "react-bootstrap"; // Import components from react-bootstrap

const ProductDetail = () => {
  const { id } = useParams(); // Extract the product ID from the URL parameters
  const [product, setProduct] = useState(null); // State to store the product details
  const [message, setMessage] = useState(""); // State to store messages

  // useEffect hook to fetch product details when the component mounts or when the ID changes
  useEffect(() => {
    // Fetch the product details from the server
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => setProduct(data)) // Update the product state with the fetched data
      .catch((error) => console.error("Error fetching product:", error)); // Handle any errors that occur during the fetch
  }, [id]); // Dependency array includes the ID, so the effect runs when the ID changes

  // Function to add the product to the cart
  const addToCart = () => {
    // Send a POST request to add the product to the cart
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }), // Send the product ID in the request body
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        if (data.id) {
          setMessage("Product added to cart"); // Set success message if product is added to the cart
        } else {
          setMessage("Failed to add product to cart"); // Set error message if adding the product to the cart fails
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error); // Log any errors that occur
        setMessage("An error occurred. Please try again."); // Set error message if an error occurs
      });
  };

  // Display a loading message if it takes while to get the product details
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 product-detail">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:5000/public/${product.image_url}`} // Display the product image
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1> {/* Display the product name */}
          <h2 className="text-primary">
            ${parseFloat(product.price).toFixed(2)}{" "}
            {/* Display the product price */}
          </h2>
          {message && <div className="alert alert-info">{message}</div>}
          <Button
            className="btn btn-primary mb-3"
            onClick={addToCart} // Add to Cart button
          >
            Add to Cart
          </Button>
          <Accordion defaultActiveKey="0">
            {/* Accordion for product details */}
            <AccordionItem eventKey="0">
              <AccordionHeader>Description</AccordionHeader>
              <AccordionBody>{product.description}</AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="1">
              <AccordionHeader>Type</AccordionHeader>
              <AccordionBody>{product.product_type}</AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="2">
              <AccordionHeader>Team</AccordionHeader>
              <AccordionBody>{product.team}</AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="3">
              <AccordionHeader>Sport</AccordionHeader>
              <AccordionBody>{product.sport}</AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
