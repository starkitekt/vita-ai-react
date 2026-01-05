import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <motion.div
                        className="hero-badge"
                        aria-label="Trusted by 10,000+ clinicians"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                            <polygon points="12,2 15,8.5 22,9.3 17,14 18.2,21 12,17.5 5.8,21 7,14 2,9.3 9,8.5" />
                        </svg>
                        <span>Trusted by 10,000+ Indian Clinicians</span>
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Your AI Medical<br />Assistant
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Evidence-based clinical decisions in seconds.<br />
                        Built for the Indian healthcare context.
                    </motion.p>

                    {/* Command Input Box */}
                    <motion.div
                        className="command-box"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="command-label">
                            <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            </svg>
                            <span>Try it now — no signup required</span>
                        </div>

                        <div className="command-input-wrapper">
                            <label htmlFor="heroCommandInput" className="sr-only">Clinical search query</label>
                            <input type="text" id="heroCommandInput" class="command-input" placeholder="Ask any clinical question..." aria-label="Clinical question input" />
                            <button className="btn btn-primary btn-lg" aria-label="Ask VITA AI">
                                Ask AI
                                <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12,5 19,12 12,19" />
                                </svg>
                            </button>
                        </div>

                        <div className="command-suggestions" aria-label="Suggested queries">
                            <button className="suggestion-tag">Asthma stepwise therapy</button>
                            <button className="suggestion-tag">HTN in diabetes</button>
                            <button className="suggestion-tag">Chest pain DDx</button>
                            <button className="suggestion-tag">Anemia workup</button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="features">
                <div className="container">
                    <motion.div
                        className="section-header"
                        {...fadeInUp}
                    >
                        <p className="section-label">Capabilities</p>
                        <h2>Built for Medical Practitioners</h2>
                        <p className="section-desc">
                            Evidence-based support designed for clinical workflow
                        </p>
                    </motion.div>

                    <motion.div
                        className="features-grid"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        {[
                            { title: "Evidence Based", desc: "All recommendations cite trusted sources — ADA, GINA, API, ICMR guidelines.", icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> },
                            { title: "Clinical Pathways", desc: "25+ ready-to-use protocols for common conditions, optimized for Indian settings.", icon: <><path d="M4 4h16v16H4z" /><path d="M9 9h6" /><path d="M9 13h6" /><path d="M9 17h6" /></> },
                            { title: "Instant Answers", desc: "Clinical decision support in seconds. Perfect for busy OPD environments.", icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></> },
                            { title: "Patient Memory", desc: "Store patient context for follow-up consultations. Organized project folders.", icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></> },
                            { title: "Private & Secure", desc: "Encrypted queries, never shared. Built with healthcare compliance in mind.", icon: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></> },
                            { title: "Works Offline", desc: "Offline pathways available for areas with poor connectivity. Access anywhere.", icon: <><path d="M5 12.55a11 11 0 0114.08 0" /><path d="M1.42 9a16 16 0 0121.16 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" /></> }
                        ].map((feature, idx) => (
                            <motion.article
                                key={idx}
                                className="feature-card"
                                variants={fadeInUp}
                            >
                                <div className="feature-icon" aria-hidden="true">
                                    <svg className="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        {feature.icon}
                                    </svg>
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-desc">{feature.desc}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="trust" id="metrics">
                <div className="container">
                    <motion.div
                        className="metrics-grid"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        {[
                            { label: "Indian Clinicians", value: "10,000+" },
                            { label: "Clinical Pathways", value: "25+" },
                            { label: "Guideline Sources", value: "50+" },
                            { label: "Uptime", value: "99.5%" }
                        ].map((metric, idx) => (
                            <motion.div
                                key={idx}
                                className="metric-card"
                                variants={fadeInUp}
                            >
                                <div className="metric-value">{metric.value}</div>
                                <div className="metric-label">{metric.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="testimonial"
                        {...fadeInUp}
                    >
                        <p className="testimonial-quote">
                            "Finally, guidelines that understand the Indian context. VITA AI has become an essential part of my clinical practice."
                        </p>
                        <p className="testimonial-author">
                            — Dr. Priya Sharma, Cardiologist, AIIMS Delhi
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Advisory Board */}
            <section className="features" id="advisors">
                <div className="container">
                    <motion.div
                        className="section-header"
                        {...fadeInUp}
                    >
                        <p className="section-label">Leadership</p>
                        <h2>Medical Advisory Board</h2>
                        <p className="section-desc">
                            Clinical recommendations reviewed by leading specialists
                        </p>
                    </motion.div>

                    <motion.div
                        className="advisors-grid"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true, margin: "-100px" }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-5)' }}
                    >
                        {[
                            { name: "Dr. Rajesh Gupta", role: "Cardiology, AIIMS" },
                            { name: "Dr. Meena Shah", role: "Pulmonology, CMC" },
                            { name: "Dr. Vikram Patel", role: "Internal Medicine, PGIMER" },
                            { name: "Dr. Anita Desai", role: "Pediatrics, KEM" }
                        ].map((advisor, idx) => (
                            <motion.div
                                key={idx}
                                className="advisor-card"
                                variants={fadeInUp}
                                style={{ textAlign: 'center', padding: 'var(--space-6)', background: 'var(--white)', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-lg)' }}
                            >
                                <div className="advisor-avatar" style={{ marginBottom: 'var(--space-4)', display: 'flex', justifyContent: 'center' }}>
                                    <svg className="icon icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                                    </svg>
                                </div>
                                <h4 className="advisor-name" style={{ marginBottom: 'var(--space-1)' }}>{advisor.name}</h4>
                                <p className="advisor-role" style={{ fontSize: 'var(--text-sm)', color: 'var(--grey-500)' }}>{advisor.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" style={{ padding: 'var(--space-20) 0', textAlign: 'center', background: 'var(--grey-900)', color: 'white' }}>
                <div className="container">
                    <motion.h2
                        className="cta-title"
                        style={{ color: 'white', marginBottom: 'var(--space-4)' }}
                        {...fadeInUp}
                    >
                        Ready to Transform Your Practice?
                    </motion.h2>
                    <motion.p
                        className="cta-desc"
                        style={{ color: 'var(--grey-300)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-lg)' }}
                        {...fadeInUp}
                    >
                        Join thousands of Indian clinicians using evidence-based AI support.
                    </motion.p>
                    <motion.div
                        className="cta-actions"
                        style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}
                        {...fadeInUp}
                    >
                        <a href="/onboarding" className="btn btn-primary btn-lg" style={{ background: 'white', color: 'var(--grey-900)' }}>
                            Get Started Free
                            <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12,5 19,12 12,19" />
                            </svg>
                        </a>
                        <a href="/chat" className="btn btn-secondary btn-lg" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Try Demo</a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
