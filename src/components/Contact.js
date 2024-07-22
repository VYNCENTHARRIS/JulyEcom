import React, { useState } from "react"; // Import useState hook from React
import "./Contact.css"; // Import Contact CSS

const Contact = () => {
  // Define state variables using useState hook
  const [name, setName] = useState(""); // State to store the user's name
  const [email, setEmail] = useState(""); // State to store the user's email
  const [comment, setComment] = useState(""); // State to store the user's comment
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [message, setMessage] = useState(""); // State to store submission message

  // Validate form fields
  const validate = () => {
    const errors = {}; // Initialize an empty errors object
    if (!name.trim()) {
      errors.name = "Name is required"; // Add error message if name is empty
    }
    if (!email.trim()) {
      errors.email = "Email is required"; // Add error message if email is empty
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"; // Add error message if email format is invalid
    }
    if (!comment.trim()) {
      errors.comment = "Comment is required"; // Add error message if comment is empty
    }
    return errors; // Return the errors object
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const validationErrors = validate(); // Validate form fields
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors if there are any
    } else {
      // Send form data to the server
      fetch("http://localhost:5000/contact", {
        method: "POST", // Use POST method to send form data
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ name, email, comment }), // Send form data in the request body
      })
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          if (data.success) {
            setMessage("Thank you for your message!"); // Display a thank you message
            // Clear form fields
            setName("");
            setEmail("");
            setComment("");
            setErrors({});
          } else {
            setMessage("Failed to submit contact form. Please try again."); // Set error message if submission fails
          }
        })
        .catch((error) => {
          console.error("Error submitting contact form:", error); // Log any errors that occur during the fetch
          setMessage("An error occurred. Please try again."); // Set error message if an error occurs
        });
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1> {/* Form heading */}
      {message && <div className="alert alert-info">{message}</div>}{" "}
      {/* Display messages if any */}
      <form onSubmit={handleSubmit} className="contact-form">
        {/* Name input */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)} // Update the name state when the input changes
            required // Make the field required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}{" "}
          {/* Display validation error for name */}
        </div>
        {/* Email input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update the email state when the input changes
            required // Make the field required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}{" "}
          {/* Display validation error for email */}
        </div>
        {/* Comment textarea */}
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <textarea
            id="comment"
            className={`form-control ${errors.comment ? "is-invalid" : ""}`}
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)} // Update the comment state when the textarea changes
            required // Make the field required
          />
          {errors.comment && (
            <div className="invalid-feedback">{errors.comment}</div>
          )}{" "}
          {/* Display validation error for comment */}
        </div>
        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
