import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header aria-label="Site Header" />
            <main id="main-content" className="flex-grow" aria-label="Main Content">
                {children}
            </main>
            <Footer aria-label="Site Footer" />
        </div>
    );
};

export default Layout;
