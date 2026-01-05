import React from 'react';
import { motion } from 'framer-motion';

const Error = () => {
    return (
        <div className="error-page" style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ fontSize: '80px', fontWeight: '700', color: 'var(--grey-100)', marginBottom: 'var(--space-4)' }}>404</div>
                    <h1 style={{ marginBottom: 'var(--space-2)' }}>Page Not Found</h1>
                    <p style={{ color: 'var(--grey-500)', marginBottom: 'var(--space-8)' }}>The clinical resource you are looking for does not exist or has been moved.</p>
                    <a href="/" className="btn btn-primary">Return Home</a>
                </motion.div>
            </div>
        </div>
    );
};

export default Error;
