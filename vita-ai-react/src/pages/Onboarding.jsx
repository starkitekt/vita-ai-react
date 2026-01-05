import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Onboarding = () => {
    const [selectedMode, setSelectedMode] = useState('Specialist');

    const fadeInUp = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="onboarding" style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-20) var(--space-6)' }}>
            <motion.div className="onboarding-header" style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }} {...fadeInUp}>
                <p className="onboarding-step" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--grey-400)', marginBottom: 'var(--space-2)' }}>Step 2 of 4</p>
                <h2 className="onboarding-title" style={{ marginBottom: 'var(--space-2)' }}>Choose Your Mode</h2>
                <p className="onboarding-desc" style={{ color: 'var(--grey-500)' }}>VITA AI adapts to your clinical workflow</p>

                <div className="progress-track" style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', marginTop: 'var(--space-6)' }}>
                    {[true, true, false, false].map((complete, i) => (
                        <div key={i} className={`progress-step ${complete ? 'complete' : ''}`} style={{ width: '40px', height: '4px', background: complete ? 'var(--grey-900)' : 'var(--grey-100)', borderRadius: '2px' }}></div>
                    ))}
                </div>
            </motion.div>

            <div className="onboarding-content">
                <div className="mode-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                    {[
                        {
                            id: 'Specialist',
                            title: 'Specialist Mode',
                            desc: 'Deep expertise in your specialty with sub-specialty level detail.',
                            features: ['Latest research', 'Complex cases', 'Detailed Rx'],
                            icon: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /></>
                        },
                        {
                            id: 'Primary Care',
                            title: 'Primary Care Mode',
                            desc: 'Broad coverage for general practice and family medicine.',
                            features: ['Common conditions', 'Referral guidance', 'Cost-effective'],
                            icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></>
                        },
                        {
                            id: 'Learning',
                            title: 'Learning Mode',
                            desc: 'Educational explanations for medical students and residents.',
                            features: ['Step-by-step', 'Pathophysiology', 'Clinical pearls'],
                            icon: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></>
                        }
                    ].map((mode) => (
                        <motion.button
                            key={mode.id}
                            className={`mode-option ${selectedMode === mode.id ? 'selected' : ''}`}
                            onClick={() => setSelectedMode(mode.id)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                textAlign: 'left',
                                padding: 'var(--space-6)',
                                background: 'white',
                                border: `1px solid ${selectedMode === mode.id ? 'var(--grey-900)' : 'var(--grey-100)'}`,
                                borderRadius: 'var(--radius-lg)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: selectedMode === mode.id ? 'var(--shadow-md)' : 'none'
                            }}
                        >
                            <div className="mode-header" style={{ marginBottom: 'var(--space-4)' }}>
                                <div className="mode-icon" style={{ marginBottom: 'var(--space-3)', color: selectedMode === mode.id ? 'var(--grey-900)' : 'var(--grey-400)' }}>
                                    <svg className="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        {mode.icon}
                                    </svg>
                                </div>
                                <h3 className="mode-title" style={{ fontSize: 'var(--text-base)', fontWeight: '600' }}>{mode.title}</h3>
                            </div>
                            <p className="mode-description" style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-500)', marginBottom: 'var(--space-4)', lineHeight: '1.4' }}>{mode.desc}</p>
                            <ul className="mode-features" style={{ listStyle: 'none', fontSize: '10px', color: 'var(--grey-400)' }}>
                                {mode.features.map((f, i) => (
                                    <li key={i} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ width: '3px', height: '3px', background: 'currentColor', borderRadius: '50%' }}></div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="onboarding-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-12)' }}>
                <a href="/" className="btn btn-ghost" style={{ fontSize: 'var(--text-xs)' }}>Skip Onboarding</a>

                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <button className="btn btn-secondary">Back</button>
                    <a href="/chat" className="btn btn-primary">
                        Next
                        <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style={{ marginLeft: '8px' }}>
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12,5 19,12 12,19" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
