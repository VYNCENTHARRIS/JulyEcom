import React, { useState, useEffect } from "react";
import { Carousel, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css"; // Import Home CSS

const Home = () => {
  const [olympicsProducts, setOlympicsProducts] = useState([]);

  useEffect(() => {
    // Fetch the Olympics products from the server
    fetch("http://localhost:5000/products?sport=Olympics")
      .then((response) => response.json())
      .then((data) => setOlympicsProducts(data))
      .catch((error) =>
        console.error("Error fetching Olympics products:", error)
      );
  }, []);

  return (
    <div>
      <div className="static-img-container">
        <img
          className="static-img"
          src="/images/static1.jpg"
          alt="Static Image 1"
        />
        <div className="static-img-caption">
          <h3>We Have Hats</h3>
          <p>Explore our exclusive collection</p>
        </div>
      </div>

      <div className="container text-center">
        <h1>Welcome to the Home Page</h1>
        <Carousel className="hero-carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/baseball.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>The Lone Star Series</h3>
              <p>Cooperstown Collection Jerseys</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/mavs.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>NFL Legacy Jerseys</h3>
              <p>Back in Stock</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/lakers.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>New Releases</h3>
              <p>Shop the latest collections</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="mt-5 products-section">
          <h2>Celebrate the Olympics</h2>
          <h3>Olympics Products</h3>
          <div className="custom-carousel">
            {olympicsProducts.map((product, index) => (
              <div className="custom-carousel-item" key={product.id}>
                <Card className="product-card">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/public/${product.image_url}`}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      ${parseFloat(product.price).toFixed(2)}
                    </Card.Text>
                    <Link to={`/product/${product.id}`}>
                      <Button variant="primary">View Product</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="static-img-container">
        <img
          className="static-img"
          src="/images/static2.jpg"
          alt="Static Image 2"
        />
        <div className="static-img-caption">
          <h3>Memorabilia</h3>
          <p>Get your favorite sports memorabilia</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
