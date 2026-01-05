import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSidebar from '../components/ChatSidebar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

const Chat = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [modeDropdownActive, setModeDropdownActive] = useState(false);
    const [activeMode, setActiveMode] = useState('Specialist');

    const toggleSidebar = useCallback(() => {
        setSidebarCollapsed(prev => !prev);
    }, []);

    const handleSendMessage = useCallback((text) => {
        console.log('Sending message:', text);
        // Logic for sending message would go here
    }, []);

    const modes = useMemo(() => ['Specialist', 'Primary Care', 'Learning'], []);

    return (
        <div className="chat-layout" style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'white' }}>
            <ChatSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

            <main className="chat-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {/* Status Bar */}
                <header className="status-bar" style={{ padding: 'var(--space-3) var(--space-6)', borderBottom: '1px solid var(--grey-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', zIndex: 10 }}>
                    <div className="status-left" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <div className="mode-selector" style={{ position: 'relative' }}>
                            <button
                                className="mode-badge"
                                onClick={() => setModeDropdownActive(!modeDropdownActive)}
                                aria-expanded={modeDropdownActive}
                                aria-haspopup="listbox"
                                style={{ border: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-1) var(--space-3)', background: 'var(--grey-50)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: 'var(--text-xs)', fontWeight: '600' }}
                            >
                                <div className="mode-dot" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
                                <span>🎯 {activeMode} • Cardiology</span>
                                <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <polyline points="6,9 12,15 18,9" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {modeDropdownActive && (
                                    <motion.ul
                                        className="mode-dropdown"
                                        role="listbox"
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        style={{ position: 'absolute', top: '120%', left: 0, zIndex: 1000, background: 'white', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', width: '240px', padding: 'var(--space-2)', listStyle: 'none' }}
                                    >
                                        {modes.map(mode => (
                                            <li
                                                key={mode}
                                                role="option"
                                                aria-selected={activeMode === mode}
                                                onClick={() => { setActiveMode(mode); setModeDropdownActive(false); }}
                                                style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: activeMode === mode ? 'var(--grey-50)' : 'transparent', fontWeight: activeMode === mode ? '600' : '400', fontSize: 'var(--text-sm)' }}
                                            >
                                                {mode}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="patient-context" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--grey-500)' }}>
                            <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                            </svg>
                            <span>Ramesh S. • T2DM, CVD</span>
                        </div>
                    </div>

                    <div className="status-right">
                        <div className="connection-status" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--grey-400)' }}>
                            <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
                            <span>Encrypted Session</span>
                        </div>
                    </div>
                </header>

                {/* Messages Container */}
                <div className="messages-container" style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-8) var(--space-6)', scrollBehavior: 'smooth' }} aria-live="polite">
                    <ChatMessage
                        role="user"
                        content="Management of Type 2 Diabetes with HbA1c 9.5% in a 55-year-old patient with history of CVD"
                    />

                    <ChatMessage
                        role="ai"
                        metrics={{ confidence: 94 }}
                        content={
                            <div className="clinical-section">
                                <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: '700', textTransform: 'uppercase', color: 'var(--grey-400)', marginBottom: 'var(--space-4)' }}>Pharmacotherapy Recommendations</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: 'var(--space-3)' }}>
                                        <strong>Metformin 500mg BD</strong> — First-line therapy
                                        <span style={{ color: 'var(--grey-300)', marginLeft: 'var(--space-2)', fontSize: '10px' }}>[ADA 2024]</span>
                                    </li>
                                    <li style={{ marginBottom: 'var(--space-3)' }}>
                                        <strong>Add SGLT2 inhibitor</strong> (Empagliflozin) — Proven CV mortality benefit
                                        <span style={{ color: 'var(--grey-300)', marginLeft: 'var(--space-2)', fontSize: '10px' }}>[EMPA-REG]</span>
                                    </li>
                                </ul>
                            </div>
                        }
                    />
                </div>

                <ChatInput onSend={handleSendMessage} />
            </main>
        </div>
    );
};

export default Chat;
