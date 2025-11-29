import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-minimal">
      <div className="footer-minimal-content">
        <div className="footer-brand">
          <span className="footer-logo">English With Wit</span>
          <p>Making English learning accessible and enjoyable for everyone.</p>
        </div>
        
        <div className="footer-minimal-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; 2025 Wit. Made with 💙 for language lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;