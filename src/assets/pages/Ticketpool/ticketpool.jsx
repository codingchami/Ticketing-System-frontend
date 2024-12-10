import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicketPool.css'; // Import the related CSS file

function TicketPool() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    // Fetch all tickets when the component mounts
    axios
      .get('http://localhost:8081/api/v1/ticket/get-all-tickets-by-status?status=AVAILABLE')
      .then((response) => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching tickets');
        setLoading(false);
      });
  }, []);

  // Handle the buy button click to open the modal
  const handleBuyClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCustomerId('');
  };

  // Handle the ticket purchase
  const handlePurchase = () => {
    if (!customerId) {
      alert('Please enter a valid Customer ID');
      return;
    }

    // Making the API call to purchase the ticket
    axios
      .post(`http://localhost:8081/api/v1/ticket/ticket-purcahse?ticket_id=${selectedTicket.ticketId}&customer_id=${customerId}`)
      .then((response) => {
        alert('Ticket purchased successfully');
        // Update the ticket status in the UI
        setTickets(tickets.filter(ticket => ticket.ticketId !== selectedTicket.ticketId)); // Remove ticket from pool
        handleCloseModal(); // Close the modal after successful purchase
      })
      .catch((err) => {
        alert('Error purchasing the ticket');
        handleCloseModal(); // Close the modal after failed purchase
      });
  };

  return (
    <div className="ticket-pool">
      <h2 className="heading">Ticket Pool</h2>

      {loading && <p className="loading">Loading tickets...</p>}
      {error && <p className="error-message">{error}</p>}
      {tickets.length === 0 && !loading && <p className="no-tickets">No tickets available</p>}

      <div className="card-container">
        {tickets.map((ticket) => (
          <div key={ticket.ticketId} className="card" style={{ backgroundColor: '#f0f4f7' }}>
            <div className="card-body">
              <h5 className="card-title">{ticket.ticketName}</h5>
              <p className="card-text">Price: ${ticket.ticketPrice}</p>
              <p className="card-text">Status: {ticket.ticketStatus}</p>
              <button className="btn btn-primary buy-btn" onClick={() => handleBuyClick(ticket)}>
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for buying the ticket */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Purchase Ticket</h3>
            <p>Ticket ID: {selectedTicket.ticketId}</p>
            <label htmlFor="customerId">Customer ID:</label>
            <input
              type="number"
              id="customerId"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter your customer ID"
            />
            <button className="btn btn-success" onClick={handlePurchase}>
              Confirm Purchase
            </button>
            <button className="btn btn-danger" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketPool;
