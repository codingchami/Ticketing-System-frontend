import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import './ControlPanel.css'; // Import the related CSS file

function ControlPanel() {
  // State to manage vendor ID and visibility of the input field
  const [data, setData] = useState({
    vendorid: '',
  });

  const [isStarted, setIsStarted] = useState(false);  // State to toggle Start/Stop
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if submission is successful

  // Handle input changes for vendor ID
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle the "Start" button click (start vendor thread)
  const handleStart = async (e) => {
    e.preventDefault();
    setIsStarted(true); // Show the vendor ID input field when "Start" is clicked
  };

  // Handle the "Stop" button click (stop vendor thread)
  const handleStop = () => {
    setIsStarted(false); // Hide the vendor ID input field when "Stop" is clicked
    setData({ vendorid: '' }); // Clear the vendor ID input field
    setIsSubmitted(false); // Reset submission state
  };

  // Handle vendor ID submission and call the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.vendorid.trim() === '') {
      alert('Please enter a valid Vendor ID.');
      return;
    }

    try {
      // Call the backend API with the vendor ID
      const response = await axios.post(
        `http://localhost:8081/api/v1/vendor/start-vendor-thread/${data.vendorid}`
      );
      console.log("Vendor thread started successfully and started adding tickets.");
      alert("Vendor thread started successfully.");
      setIsSubmitted(true); // Mark as successfully submitted
    } catch (error) {
      console.log("Error occurred in starting vendor thread.", error);
      alert("Error occurred in starting vendor thread.");
    }
  };

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <div className="buttons">
        <button type="button" className="btn btn-success" onClick={handleStart}>
          Start
        </button>
        <button type="button" className="btn btn-danger" onClick={handleStop}>
          Stop
        </button>
      </div>

      {/* Conditionally render the vendor ID input field */}
      {isStarted && (
        <div className="form-group">
          <label htmlFor="vendorID">Vendor ID</label>
          <input
            type="number"
            className="form-control"
            id="vendorID"
            name="vendorid"
            placeholder="Enter vendor ID"
            value={data.vendorid}
            onChange={handleInput} // Update vendor ID state
          />
          <button
            type="button"
            className="btn btn-primary submit-btn"
            onClick={handleSubmit} // Handle vendor ID submission
          >
            Submit
          </button>
        </div>
      )}

      {/* Show message when submission is successful */}
      {isSubmitted && <div className="success-message">Vendor ID {data.vendorid} submitted successfully!</div>}
    </div>
  );
}

export default ControlPanel;
