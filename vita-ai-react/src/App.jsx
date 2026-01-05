import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Pathways = lazy(() => import('./pages/Pathways'));
const About = lazy(() => import('./pages/About'));
const Error = lazy(() => import('./pages/Error'));

// Loading fallback component
const PageLoader = () => (
    <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader" style={{ width: '32px', height: '32px', border: '3px solid var(--grey-100)', borderTop: '3px solid var(--grey-900)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
);

function App() {
    return (
        <Router>
            <Layout>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/pathways" element={<Pathways />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Suspense>
            </Layout>
        </Router>
    );
}

export default App;
