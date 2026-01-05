import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    };

    const advisors = [
        { name: "Dr. Rajesh Gupta", role: "Cardiology, AIIMS Delhi", bio: "25+ years in interventional cardiology. Former Head of Department at AIIMS. Special interest in CVD prevention." },
        { name: "Dr. Meena Shah", role: "Pulmonology, CMC Vellore", bio: "Expert in COPD and asthma management. Member of GINA guidelines committee. Published 50+ research papers." },
        { name: "Dr. Vikram Patel", role: "Internal Medicine, PGIMER", bio: "Specialist in complex multi-morbidity cases. Lead author of API clinical guidelines. Focuses on geriatric care." },
        { name: "Dr. Anita Desai", role: "Pediatrics, KEM Mumbai", bio: "20+ years in pediatric critical care. IAP guidelines contributor. Passionate about child health equity." }
    ];

    const guidelines = ['ADA', 'GINA', 'API', 'ICMR', 'RSSDI', 'CSI'];

    return (
        <div className="about-page">
            <section className="about-hero" style={{ padding: 'var(--space-20) 0 var(--space-12)', background: 'var(--grey-50)', borderBottom: '1px solid var(--grey-100)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}
                    >
                        About VITA AI
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ color: 'var(--grey-500)', fontSize: 'var(--text-xl)' }}
                    >
                        Building trust in medical AI for Indian clinicians
                    </motion.p>
                </div>
            </section>

            <section className="mission-section" style={{ padding: 'var(--space-20) 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.p
                        {...fadeInUp}
                        style={{ fontSize: 'var(--text-2xl)', fontWeight: '600', color: 'var(--grey-900)', maxWidth: '800px', margin: '0 auto var(--space-8)' }}
                    >
                        "To empower every Indian clinician with evidence-based clinical decision support, regardless of location or resources."
                    </motion.p>
                    <motion.p
                        {...fadeInUp}
                        style={{ color: 'var(--grey-500)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.8' }}
                    >
                        VITA AI combines the latest medical guidelines with AI technology to provide instant, reliable clinical support. We understand the unique challenges of Indian healthcare and build solutions that work in your context.
                    </motion.p>
                </div>
            </section>

            <section className="features" id="advisors" style={{ padding: 'var(--space-20) 0', background: 'var(--grey-50)' }}>
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
                        <p className="section-label">Leadership</p>
                        <h2>Medical Advisory Board</h2>
                    </div>

                    <div className="advisors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-8)' }}>
                        {advisors.map((advisor, idx) => (
                            <motion.article
                                key={idx}
                                className="bio-card"
                                {...fadeInUp}
                                style={{ background: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--grey-100)', display: 'flex', gap: 'var(--space-6)' }}
                            >
                                <div className="bio-avatar" style={{ flexShrink: 0 }}>
                                    <div style={{ width: '64px', height: '64px', background: 'var(--grey-50)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--grey-400)' }}>
                                        <svg className="icon icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                            <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="bio-content">
                                    <h4 className="bio-name" style={{ marginBottom: 'var(--space-1)' }}>{advisor.name}</h4>
                                    <p className="bio-role" style={{ color: 'var(--grey-900)', fontWeight: '600', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>{advisor.role}</p>
                                    <p className="bio-text" style={{ fontSize: 'var(--text-sm)', color: 'var(--grey-500)', lineHeight: '1.6' }}>{advisor.bio}</p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="guidelines-section" style={{ padding: 'var(--space-20) 0' }}>
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                        <p className="section-label">Sources</p>
                        <h2>Guidelines We Follow</h2>
                    </div>

                    <div className="guidelines-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-8)' }}>
                        {guidelines.map((g, i) => (
                            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} style={{ textAlign: 'center' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1px solid var(--grey-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: 'var(--text-sm)', color: 'var(--grey-900)', marginBottom: 'var(--space-2)' }}>{g}</div>
                                <div style={{ fontSize: '10px', color: 'var(--grey-400)', fontWeight: '600' }}>GUIDELINE</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="transparency-section" style={{ padding: 'var(--space-20) 0', background: 'var(--grey-900)', color: 'white' }}>
                <div className="container">
                    <motion.div {...fadeInUp} className="transparency-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>AI Disclosure</h2>
                        <p style={{ color: 'var(--grey-400)', lineHeight: '1.8' }}>
                            VITA AI is a clinical decision support tool, not a replacement for clinical judgment. All recommendations should be verified against current guidelines and adapted to individual patient circumstances. VITA AI does not store patient-identifiable data. Always consult primary sources for critical decisions.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
