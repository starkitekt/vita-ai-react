import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Pathways = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Cardiology', 'Pulmonology', 'Endocrinology', 'Nephrology', 'Pediatrics', 'Emergency'];

    const pathways = [
        { title: "Type 2 Diabetes Management", source: "ADA 2024 + RSSDI", desc: "Complete stepwise approach to T2DM including HbA1c targets and pharmacotherapy.", category: "Endocrinology", offline: true },
        { title: "Asthma Stepwise Therapy", source: "GINA 2024", desc: "Stepwise approach to asthma management including controller and reliever use.", category: "Pulmonology", offline: true },
        { title: "Hypertension Management", source: "ISH 2023 + API", desc: "First-line therapy selection, combination strategies, and resistant HTN.", category: "Cardiology", offline: true },
        { title: "Acute Coronary Syndrome", source: "ACC/AHA + CSI", desc: "STEMI vs NSTEMI approach, risk stratification, and pharmacological management.", category: "Cardiology", offline: false },
        { title: "COPD Management", source: "GOLD 2024", desc: "ABCD assessment, inhaler selection, and exacerbation management protocol.", category: "Pulmonology", offline: true },
        { title: "Pediatric Fever Workup", source: "IAP 2023", desc: "Age-based approach to fever, red flags, and antibiotic selection.", category: "Pediatrics", offline: false }
    ];

    const filteredPathways = activeCategory === 'All'
        ? pathways
        : pathways.filter(p => p.category === activeCategory);

    return (
        <div className="pathways-page">
            <section className="pathways-hero" style={{ padding: 'var(--space-20) 0 var(--space-12)', background: 'var(--grey-50)', borderBottom: '1px solid var(--grey-100)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}
                    >
                        Clinical Pathways
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ color: 'var(--grey-500)', maxWidth: '600px', margin: '0 auto' }}
                    >
                        25+ evidence-based protocols optimized for Indian healthcare settings. Available offline.
                    </motion.p>
                </div>
            </section>

            <nav className="category-tabs" style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)', padding: 'var(--space-6) 0', borderBottom: '1px solid var(--grey-100)', sticky: 'top', background: 'white', zIndex: 10 }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: 'var(--space-2) var(--space-4)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: '600',
                            border: 'none',
                            background: activeCategory === cat ? 'var(--grey-900)' : 'transparent',
                            color: activeCategory === cat ? 'white' : 'var(--grey-400)',
                            borderRadius: 'var(--radius-full)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </nav>

            <section className="features" style={{ padding: 'var(--space-16) 0' }}>
                <div className="container">
                    <motion.div
                        className="pathways-grid"
                        layout
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }}
                    >
                        <AnimatePresence>
                            {filteredPathways.map((pathway, idx) => (
                                <motion.article
                                    key={pathway.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="pathway-card"
                                    style={{ padding: 'var(--space-6)', background: 'white', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
                                >
                                    <div className="pathway-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div className="pathway-icon" style={{ padding: 'var(--space-2)', background: 'var(--grey-50)', borderRadius: 'var(--radius-md)', color: 'var(--grey-700)' }}>
                                            <svg className="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                            </svg>
                                        </div>
                                        {pathway.offline && (
                                            <span className="offline-badge" style={{ fontSize: '10px', fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
                                                OFFLINE
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="pathway-title" style={{ fontSize: 'var(--text-lg)', fontWeight: '600' }}>{pathway.title}</h3>
                                    <p className="pathway-source" style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--grey-400)', textTransform: 'uppercase' }}>{pathway.source}</p>
                                    <p className="pathway-desc" style={{ fontSize: 'var(--text-sm)', color: 'var(--grey-500)', flex: 1 }}>{pathway.desc}</p>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Pathways;
