import React, { useState } from 'react';
import './CustomerSignup.css';
import axios from 'axios';

function CustomerSignup() {
  
  const [data, setData] = useState({
    customerName: '',
    email: '',
    contacts: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveCustomer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/v1/customer/save-customer', {
        customerName: data.customerName,
        email: data.email,
        contacts: data.contacts,
      });

      console.log("Customer saved successfully");
      alert("Customer saved successfully");
      
    } catch (error) {
      console.log("Error in customer save", error);
      alert("Error in customer save");
    }
  };
  
  return (
    <form onSubmit={saveCustomer}>
      <div className="form-group">
        <label htmlFor="customerName">Name</label>
        <input
          type="text"
          className="form-control"
          id="customerName"
          name="customerName"
          value={data.customerName}
          onChange={handleInput}
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          value={data.email}
          onChange={handleInput}
          placeholder="Enter email"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="contacts">Contact Number</label>
        <input
          type="text"
          className="form-control"
          id="contacts"
          name="contacts"
          value={data.contacts}
          onChange={handleInput}
          placeholder="Enter contact number"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default CustomerSignup;
