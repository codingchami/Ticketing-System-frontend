import React, { useState } from 'react';
import './VendorSignup.css'; // Import the related CSS file
import axios from 'axios';

function VendorSignup() {
  // State to store vendor data
  const [data, setData] = useState({
    vendorID: '',   // Added vendorID field
    vendorName: '',
    email: '',
  });

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,  // Dynamically set the state property based on the input name
    }));
  };

  // Function to save the vendor to the backend
  const saveVendor = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Sending POST request to save the vendor
      const response = await axios.post('http://localhost:8081/api/v1/vendor/save-vendor', {
        vendorID: data.vendorID,  // Send vendorID
        vendorName: data.vendorName,
        email: data.email,
      });

      // Success message
      console.log("Vendor saved successfully");
      alert("Vendor saved successfully");
      
    } catch (error) {
      // Handle error if the request fails
      console.log("Error in Vendor save", error);
      if (error.response) {
        // If response from the server is available
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error in Vendor save");
      }
    }
  };

  return (
    <form onSubmit={saveVendor}>
      <div className="form-group">
        <label htmlFor="vendorID">Vendor ID</label>
        <input
          type="number"
          className="form-control"
          id="vendorID"
          name="vendorID" // name should match state key
          placeholder="Enter vendor ID"
          value={data.vendorID}
          onChange={handleInput} // Update state on input change
        />
      </div>
      <div className="form-group">
        <label htmlFor="vendorName">Vendor Name</label>
        <input
          type="text"
          className="form-control"
          id="vendorName"
          name="vendorName" // name should match state key
          placeholder="Enter vendor name"
          value={data.vendorName}
          onChange={handleInput} // Update state on input change
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email" // name should match state key
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={data.email}
          onChange={handleInput} // Update state on input change
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default VendorSignup;
