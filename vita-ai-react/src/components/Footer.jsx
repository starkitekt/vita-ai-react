import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="/about" className="footer-link">About Us</a>
                        <a href="#" className="footer-link">Privacy Policy</a>
                        <a href="#" className="footer-link">Terms of Service</a>
                        <a href="#contact" className="footer-link">Contact</a>
                        <a href="#" className="footer-link">हिंदी</a>
                    </div>
                    <p className="footer-copy">
                        © 2026 VITA AI — Clinical Decision Support
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
