import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main id="main-content" className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
