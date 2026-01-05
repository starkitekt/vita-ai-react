import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Onboarding from './pages/Onboarding';
import Pathways from './pages/Pathways';
import About from './pages/About';
import Error from './pages/Error';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/pathways" element={<Pathways />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
