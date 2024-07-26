import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = ({ updateCartCount }) => {
  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterPriceRange, setFilterPriceRange] = useState("");
  const [filterTeam, setFilterTeam] = useState("");
  const [filterSport, setFilterSport] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://julyecom.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleTypeFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handlePriceRangeFilterChange = (e) => {
    setFilterPriceRange(e.target.value);
  };

  const handleTeamFilterChange = (e) => {
    setFilterTeam(e.target.value);
  };

  const handleSportFilterChange = (e) => {
    setFilterSport(e.target.value);
  };

  const addToCart = (productId) => {
    fetch("https://julyecom.onrender.com/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setMessage("Product added to cart");
          fetch("https://julyecom.onrender.com/cart")
            .then((response) => response.json())
            .then((data) => {
              updateCartCount(data.length);
            })
            .catch((error) =>
              console.error("Error fetching cart items:", error)
            );
        } else {
          setMessage("Failed to add product to cart");
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        setMessage("An error occurred. Please try again.");
      });
  };

  const getPriceRange = (price) => {
    if (price <= 50) return "0-50";
    if (price <= 100) return "51-100";
    if (price <= 150) return "101-150";
    if (price <= 200) return "151-200";
    return "200+";
  };

  const filteredProducts = products.filter((product) => {
    const priceRange = getPriceRange(parseFloat(product.price));
    return (
      (filterType
        ? product.product_type.toLowerCase().includes(filterType.toLowerCase())
        : true) &&
      (filterPriceRange ? priceRange === filterPriceRange : true) &&
      (filterTeam
        ? product.team.toLowerCase().includes(filterTeam.toLowerCase())
        : true) &&
      (filterSport
        ? product.sport.toLowerCase().includes(filterSport.toLowerCase())
        : true)
    );
  });

  return (
    <div>
      <h1>Products</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="row mb-4">
        <div className="col-md-3">
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
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={`https://julyecom.onrender.com/public/${product.image_url}`}
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
