import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [modeDropdownActive, setModeDropdownActive] = useState(false);
    const [activeMode, setActiveMode] = useState('Specialist');

    return (
        <div className={`chat-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`} style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Sidebar - Operations Panel */}
            <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} style={{ width: sidebarCollapsed ? '64px' : '260px', transition: 'width 0.3s ease' }}>
                <div className="sidebar-header">
                    <a href="/" className="sidebar-logo">
                        <div className="logo-mark">V</div>
                        {!sidebarCollapsed && <span>VITA</span>}
                    </a>

                    {!sidebarCollapsed && (
                        <button className="new-session-btn" aria-label="Create new clinical session">
                            <svg className="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span>New Session</span>
                        </button>
                    )}
                </div>

                {/* Sidebar Search */}
                {!sidebarCollapsed && (
                    <div className="sidebar-search">
                        <div className="search-container">
                            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input type="text" className="search-input" placeholder="Search chats..." />
                            <span className="search-shortcut">⌘K</span>
                        </div>
                    </div>
                )}

                {/* Workspace Navigation */}
                <nav className="workspace-nav">
                    <div className="workspace-section">
                        {!sidebarCollapsed && <div className="workspace-label"><span>Workspace</span></div>}
                        <div className="workspace-item active">
                            <svg className="workspace-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            {!sidebarCollapsed && <span>All Chats</span>}
                            {!sidebarCollapsed && <span className="workspace-count">23</span>}
                        </div>
                        {/* Additional items truncated for brevity in porting */}
                    </div>
                </nav>

                {/* Recent Patients */}
                {!sidebarCollapsed && (
                    <div className="patient-cards">
                        <div className="workspace-label"><span>Recent Patients</span></div>
                        {[
                            { init: 'RS', name: 'Ramesh S.', meta: 'T2DM • CVD • 55y' },
                            { init: 'PM', name: 'Priya M.', meta: 'Asthma • 32y' }
                        ].map((patient, i) => (
                            <div key={i} className="patient-card">
                                <div className="patient-avatar">{patient.init}</div>
                                <div className="patient-info">
                                    <div className="patient-name">{patient.name}</div>
                                    <div className="patient-meta">{patient.meta}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Collapse Button */}
                <button
                    className="collapse-btn"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%' }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'none' }}>
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                    {!sidebarCollapsed && <span>Collapse</span>}
                </button>
            </aside>

            {/* Main Chat Area */}
            <main className="chat-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>
                {/* Status Bar */}
                <div className="status-bar" style={{ padding: 'var(--space-3) var(--space-6)', borderBottom: '1px solid var(--grey-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="status-left" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <div className="mode-selector" style={{ position: 'relative' }}>
                            <div
                                className="mode-badge"
                                onClick={() => setModeDropdownActive(!modeDropdownActive)}
                                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-1) var(--space-3)', background: 'var(--grey-50)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: 'var(--text-xs)', fontWeight: '600' }}
                            >
                                <div className="mode-dot active" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
                                <span>🎯 {activeMode} • Cardiology</span>
                                <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <polyline points="6,9 12,15 18,9" />
                                </svg>
                            </div>

                            <AnimatePresence>
                                {modeDropdownActive && (
                                    <motion.div
                                        className="mode-dropdown active"
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        style={{ position: 'absolute', top: '120%', left: 0, zIndex: 1000, background: 'white', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', width: '280px', padding: 'var(--space-2)' }}
                                    >
                                        {['Specialist', 'Primary Care', 'Learning'].map(mode => (
                                            <div
                                                key={mode}
                                                className={`mode-option ${activeMode === mode ? 'selected' : ''}`}
                                                onClick={() => { setActiveMode(mode); setModeDropdownActive(false); }}
                                                style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: activeMode === mode ? 'var(--grey-50)' : 'transparent' }}
                                            >
                                                <div className="mode-option-title" style={{ fontWeight: '600', fontSize: 'var(--text-sm)' }}>{mode}</div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="patient-context" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--grey-500)' }}>
                            <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                            </svg>
                            <span className="patient-tag">Ramesh S. • T2DM, CVD</span>
                        </div>
                    </div>

                    <div className="status-right" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <div className="connection-indicator" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--grey-400)' }}>
                            <div className="connection-dot online" style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
                            <span>Connected</span>
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="messages-container active" style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-8) var(--space-6)' }}>
                    <div className="message user" style={{ maxWidth: '800px', margin: '0 auto var(--space-8) auto' }}>
                        <div className="message-content" style={{ fontSize: 'var(--text-lg)', fontWeight: '500', color: 'var(--grey-900)' }}>
                            Management of Type 2 Diabetes with HbA1c 9.5% in a 55-year-old patient with history of CVD
                        </div>
                    </div>

                    <motion.div
                        className="message ai"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ maxWidth: '800px', margin: '0 auto var(--space-12) auto' }}
                    >
                        <div className="message-content" style={{ background: 'var(--grey-50)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--grey-100)' }}>
                            <div className="metrics-bar" style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--grey-100)', paddingBottom: 'var(--space-4)' }}>
                                <div className="metric-item" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--grey-500)' }}>
                                    <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style={{ width: '16px' }}>
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                    <span><strong>94%</strong> confidence</span>
                                </div>
                            </div>

                            <div className="clinical-section">
                                <h4 className="clinical-heading" style={{ fontSize: 'var(--text-sm)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--grey-400)', marginBottom: 'var(--space-4)' }}>Pharmacotherapy Recommendations</h4>
                                <ul style={{ listStyle: 'none' }}>
                                    <li style={{ marginBottom: 'var(--space-3)' }}><strong>Metformin 500mg BD</strong> — First-line therapy <span style={{ color: 'var(--grey-400)', fontSize: '10px' }}>[1][2]</span></li>
                                    <li style={{ marginBottom: 'var(--space-3)' }}><strong>Add SGLT2 inhibitor</strong> (Empagliflozin) — Proven CV mortality benefit <span style={{ color: 'var(--grey-400)', fontSize: '10px' }}>[1][3]</span></li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Input Area */}
                <div className="input-area" style={{ padding: 'var(--space-6)', borderTop: '1px solid var(--grey-100)' }}>
                    <div className="input-container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--grey-50)', border: '1px solid var(--grey-200)', borderRadius: 'var(--radius-full)', padding: 'var(--space-1) var(--space-4)', display: 'flex', alignItems: 'center' }}>
                        <input type="text" className="chat-input" placeholder="Ask a follow-up question..." style={{ flex: 1, background: 'transparent', border: 'none', padding: 'var(--space-3)', outline: 'none' }} />
                        <div className="input-tools" style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <button className="tool-btn send" style={{ padding: 'var(--space-2)', background: 'var(--grey-900)', color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
                                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style={{ width: '20px' }}>
                                    <line x1="12" y1="19" x2="12" y2="5" />
                                    <polyline points="5,12 12,5 19,12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Chat;
