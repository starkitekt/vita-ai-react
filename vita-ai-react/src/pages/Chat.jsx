import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSidebar from '../components/ChatSidebar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import ClinicalLogicGraph from '../components/ClinicalLogicGraph';

const Chat = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [modeDropdownActive, setModeDropdownActive] = useState(false);
    const [activeMode, setActiveMode] = useState('Specialist');

    const toggleSidebar = useCallback(() => {
        setSidebarCollapsed(prev => !prev);
    }, []);

    const [showShareNotification, setShowShareNotification] = useState(false);

    const handleExport = (format) => {
        console.log(`Exporting as ${format}...`);
        alert(`Clinical Report exported as ${format.toUpperCase()}`);
    };

    const handleShare = () => {
        setShowShareNotification(true);
        setTimeout(() => setShowShareNotification(false), 3000);
    };

    const logicNodes = [
        { id: 'start', x: 300, y: 30, label: 'T2DM + CVD + A1c 9.5%', source: 'Clinical Intake' },
        { id: 'first-line', x: 300, y: 100, label: 'Metformin + SGLT2i', source: 'ADA 2024, Fig 9.2', delay: 0.2 },
        { id: 'cv-benefit', x: 150, y: 170, label: 'Empagliflozin', source: 'EMPA-REG OUTCOME', delay: 0.4 },
        { id: 'control', x: 450, y: 170, label: 'HbA1c Target < 7.0%', source: 'RSSDI Guidelines', delay: 0.4 }
    ];

    const logicEdges = [
        { from: { x: 300, y: 50 }, to: { x: 300, y: 80 } },
        { from: { x: 280, y: 120 }, to: { x: 180, y: 155 } },
        { from: { x: 320, y: 120 }, to: { x: 420, y: 155 } }
    ];

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
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        style={{ position: 'absolute', top: '120%', left: 0, zIndex: 1000, background: 'white', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', width: '200px', padding: 'var(--space-2)', listStyle: 'none' }}
                                    >
                                        {modes.map(mode => (
                                            <li
                                                key={mode}
                                                onClick={() => { setActiveMode(mode); setModeDropdownActive(false); }}
                                                style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: activeMode === mode ? 'var(--grey-50)' : 'transparent', fontSize: 'var(--text-sm)' }}
                                            >
                                                {mode}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="status-right" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <div className="action-toolbar" style={{ display: 'flex', gap: 'var(--space-2)', borderRight: '1px solid var(--grey-100)', paddingRight: 'var(--space-4)' }}>
                            <button onClick={() => handleExport('pdf')} className="btn btn-icon" title="Export as PDF" style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--grey-400)' }}>
                                <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                            </button>
                            <button onClick={() => handleExport('md')} className="btn btn-icon" title="Export as Markdown" style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--grey-400)' }}>
                                <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>
                            </button>
                            <button onClick={handleShare} className="btn btn-icon" title="Secure Share" style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--grey-400)' }}>
                                <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                            </button>
                        </div>
                        <a href="/pathways" className="btn btn-ghost" style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--grey-600)' }}>View Pathways</a>
                    </div>

                    <AnimatePresence>
                        {showShareNotification && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                style={{ position: 'absolute', top: '100%', right: '24px', background: 'var(--grey-900)', color: 'white', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', fontSize: '10px', marginTop: 'var(--space-2)', boxShadow: 'var(--shadow-lg)' }}
                            >
                                Secure Share link copied to clipboard
                            </motion.div>
                        )}
                    </AnimatePresence>
                </header>

                {/* Messages Container */}
                <div className="messages-container" style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-8) var(--space-6)', scrollBehavior: 'smooth' }}>
                    <ChatMessage
                        role="user"
                        content="Management of Type 2 Diabetes with HbA1c 9.5% in a 55-year-old patient with history of CVD"
                    />

                    <ChatMessage
                        role="ai"
                        metrics={{ confidence: 94 }}
                        content={
                            <div className="clinical-logic-flow">
                                <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: '700', textTransform: 'uppercase', color: 'var(--grey-400)', marginBottom: 'var(--space-2)' }}>Clinical Reasoning Logic</h4>
                                <ClinicalLogicGraph nodes={logicNodes} edges={logicEdges} activeNodeId="first-line" />

                                <div style={{ background: 'var(--grey-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--grey-100)', marginTop: 'var(--space-4)' }}>
                                    <h5 style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>Treatment Recommendation</h5>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--grey-600)', lineHeight: '1.6' }}>
                                        Initiate Dual Therapy: **Metformin 500mg BD** + **SGLT2 inhibitor** (Empagliflozin 10mg OD).
                                        SGLT2i is mandatory given the history of CVD to reduce CV mortality [Source: ADA 2024 Section 9].
                                    </p>
                                </div>

                                <div className="pathway-bridge" style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', border: '1px dashed var(--grey-200)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                        <div style={{ background: 'var(--grey-50)', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', color: 'var(--grey-700)' }}>
                                            <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--grey-900)' }}>Suggested: T2DM Management Pathway</div>
                                            <div style={{ fontSize: '9px', color: 'var(--grey-400)' }}>Complete protocol including titration and side effects</div>
                                        </div>
                                    </div>
                                    <a href="/pathways" className="btn btn-primary" style={{ fontSize: '9px', padding: 'var(--space-1.5) var(--space-3)' }}>Open Pathway</a>
                                </div>
                            </div>
                        }
                    />
                </div>

                <ChatInput onSend={(text) => console.log(text)} />
            </main>
        </div>
    );
};

export default Chat;
