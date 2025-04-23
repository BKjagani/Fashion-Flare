import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-light pt-4 pb-3 mt-5" style={{backgroundColor : "#150010"}}>
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">FashionFlare</h5>
            <p>Your one-stop shop for the latest fashion trends and timeless styles.</p>
          </div>

          {/* Navigation */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
              <li><Link to="/orders" className="text-light text-decoration-none">My Orders</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5"><FaFacebookF /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
              <a href="#" className="text-light fs-5"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center mb-0">© {new Date().getFullYear()} FashionFlare. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
