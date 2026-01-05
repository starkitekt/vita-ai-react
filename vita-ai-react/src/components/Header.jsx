import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <motion.a
                        href="/"
                        className="logo"
                        aria-label="VITA AI Home"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="logo-mark" aria-hidden="true">V</div>
                        <span>VITA AI</span>
                    </motion.a>

                    <nav className="nav" aria-label="Main Navigation">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="/pathways" className="nav-link">Pathways</a>
                        <a href="/about" className="nav-link">About</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </nav>

                    <div className="nav-actions">
                        <div className="lang-toggle" aria-label="Language selection">
                            <button className="lang-btn active" aria-pressed="true">EN</button>
                            <button className="lang-btn" aria-pressed="false">हिं</button>
                        </div>
                        <a href="/chat" className="btn btn-ghost">Sign In</a>
                        <a href="/onboarding" className="btn btn-primary">Get Started</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
