import React, { useState, useEffect } from "react"; // Import necessary hooks from React
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

const Products = ({ updateCartCount }) => {
  // Define state variables using the useState hook
  const [products, setProducts] = useState([]); // State to store the list of products
  const [filterType, setFilterType] = useState(""); // State to store the selected product type filter
  const [filterPriceRange, setFilterPriceRange] = useState(""); // State to store the selected price range filter
  const [filterTeam, setFilterTeam] = useState(""); // State to store the selected team filter
  const [filterSport, setFilterSport] = useState(""); // State to store the selected sport filter
  const [message, setMessage] = useState(""); // State to store messages (e.g., success or error messages)

  // useEffect to fetch products from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => setProducts(data)) // Update the products state with the fetched data
      .catch((error) => console.error("Error fetching products:", error)); // Handle any errors that occur during the fetch
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Handler for changes in the product type filter
  const handleTypeFilterChange = (e) => {
    setFilterType(e.target.value); // Update the filterType state with the selected value
  };

  // Handler for changes in the price range filter
  const handlePriceRangeFilterChange = (e) => {
    setFilterPriceRange(e.target.value); // Update the filterPriceRange state with the selected value
  };

  // Handler for changes in the team filter
  const handleTeamFilterChange = (e) => {
    setFilterTeam(e.target.value); // Update the filterTeam state with the selected value
  };

  // Handler for changes in the sport filter
  const handleSportFilterChange = (e) => {
    setFilterSport(e.target.value); // Update the filterSport state with the selected value
  };

  // Function to add a product to the cart
  const addToCart = (productId) => {
    fetch("http://localhost:5000/cart", {
      method: "POST", // Use POST method to send the product ID
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ productId }), // Send the product ID in the request body
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        if (data.id) {
          setMessage("Product added to cart"); // Set success message if the product is added to the cart
          // Fetch the updated cart items to update the cart count
          fetch("http://localhost:5000/cart")
            .then((response) => response.json())
            .then((data) => {
              updateCartCount(data.length); // Update the cart count with the new number of items
            })
            .catch((error) =>
              console.error("Error fetching cart items:", error)
            ); // Handle any errors that occur during the fetch
        } else {
          setMessage("Failed to add product to cart"); // Set error message if adding the product to the cart fails
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error); // Handle any errors that occur during the fetch
        setMessage("An error occurred. Please try again."); // Set error message if an error occurs
      });
  };

  // Function to determine the price range category for a given price
  const getPriceRange = (price) => {
    if (price <= 50) return "0-50"; // Return "0-50" for prices up to $50
    if (price <= 100) return "51-100"; // Return "51-100" for prices up to $100
    if (price <= 150) return "101-150"; // Return "101-150" for prices up to $150
    if (price <= 200) return "151-200"; // Return "151-200" for prices up to $200
    return "200+"; // Return "200+" for prices above $200
  };

  // Filter the products based on the selected filters
  const filteredProducts = products.filter((product) => {
    const priceRange = getPriceRange(parseFloat(product.price)); // Get the price range for the product
    return (
      (filterType
        ? product.product_type.toLowerCase().includes(filterType.toLowerCase()) // Filter by type
        : true) &&
      (filterPriceRange ? priceRange === filterPriceRange : true) && // Filter by price range
      (filterTeam
        ? product.team.toLowerCase().includes(filterTeam.toLowerCase()) // Filter by team
        : true) &&
      (filterSport
        ? product.sport.toLowerCase().includes(filterSport.toLowerCase()) // Filter by sport
        : true)
    );
  });

  return (
    <div>
      <h1>Products</h1>
      {message && <div className="alert alert-info">{message}</div>}{" "}
      {/* Display messages if any */}
      <div className="row mb-4">
        <div className="col-md-3">
          {/* Filter by Type */}
          <div className="mb-3">
            <label htmlFor="filterType" className="form-label">
              Filter by Type
            </label>
            <select
              id="filterType"
              className="form-control"
              value={filterType}
              onChange={handleTypeFilterChange}
            >
              <option value="">All</option>
              <option value="jersey">Jersey</option>
              <option value="hat">Hat</option>
              <option value="jacket">Jacket</option>
              <option value="shorts">Shorts</option>
              <option value="t-shirt">T-shirt</option>
            </select>
          </div>
          {/* Filter by Price */}
          <div className="mb-3">
            <label htmlFor="filterPriceRange" className="form-label">
              Filter by Price
            </label>
            <select
              id="filterPriceRange"
              className="form-control"
              value={filterPriceRange}
              onChange={handlePriceRangeFilterChange}
            >
              <option value="">All</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-150">$101 - $150</option>
              <option value="151-200">$151 - $200</option>
              <option value="200+">$200+</option>
            </select>
          </div>
          {/* Filter by Team */}
          <div className="mb-3">
            <label htmlFor="filterTeam" className="form-label">
              Filter by Team
            </label>
            <select
              id="filterTeam"
              className="form-control"
              value={filterTeam}
              onChange={handleTeamFilterChange}
            >
              <option value="">All</option>
              <option value="Charlotte Hornets">Charlotte Hornets</option>
              <option value="Team USA">Team USA</option>
              <option value="University of North Carolina">
                University of North Carolina
              </option>
              <option value="Carolina Panthers">Carolina Panthers</option>
            </select>
          </div>
          {/* Filter by Sport */}
          <div className="mb-3">
            <label htmlFor="filterSport" className="form-label">
              Filter by Sport
            </label>
            <select
              id="filterSport"
              className="form-control"
              value={filterSport}
              onChange={handleSportFilterChange}
            >
              <option value="">All</option>
              <option value="Olympics">Olympics</option>
              <option value="NBA">NBA</option>
              <option value="NFL">NFL</option>
              <option value="NCAA">NCAA</option>
            </select>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            {/* Render filtered products */}
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={`http://localhost:5000/public/${product.image_url}`}
                      className="card-img-top"
                      alt={product.name}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      ${parseFloat(product.price).toFixed(2)}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
