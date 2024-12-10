import React from 'react';
import './home.css' // Import custom CSS for styling

function HomePage() {
  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1 className="title">Welcome to the Ticketing System</h1>
          <p className="subtitle">Your seamless ticket booking experience starts here.</p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="main-content">
        <div className="button-container">
          <h3 className="action-title">Select Your Role to Continue</h3>
          <div className="buttons">
            <a href="/vendor-login" className="btn btn-vendor">Vendor</a>
            <a href="/customer-login" className="btn btn-customer">Customer</a>
            <a href="/admin-login" className="btn btn-admin">Admin</a>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p className="footer-text">&copy; 2024 Ticketing System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
