import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import "./Footer.css"; // Import Footer CSS

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>Visit</h5>
            <ul className="list-unstyled">
              <li>Find a Store</li>
              <li>Change Country</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Order Status</li>
              <li>Returns</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Join Ecomm News</h5>
            <p>Subscribe to our list and get 10% off your next order</p>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
            <button className="btn btn-primary mt-2">Subscribe</button>
          </div>
        </div>
        <div className="mt-4">
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
          <p>&copy; 2024 Redeisned Ecommerce. All rights reserved.</p>
          <p>Terms of Use | Privacy Policy | Supply Chain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
