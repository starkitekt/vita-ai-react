import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import MediaDisplay from './MediaDisplay';
import ImageLightbox from './ImageLightbox';

const ChatMessage = memo(({ role, content, metrics, sources, thoughtProcess, attachments }) => {
    const isAI = role === 'ai';
    const [lightboxImages, setLightboxImages] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const handleLightboxOpen = (imageSrc) => {
        const imageAttachments = attachments?.filter(att => att.type?.startsWith('image/')) || [];
        const images = imageAttachments.map(att => att.preview || att.url || URL.createObjectURL(att));
        const index = images.findIndex(img => img === imageSrc);
        setLightboxImages(images);
        setLightboxIndex(index >= 0 ? index : 0);
    };

    const handleLightboxClose = () => {
        setLightboxImages(null);
    };

    return (
        <motion.div
            className={`message ${role}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
                width: '100%',
                maxWidth: isAI ? '800px' : '750px',
                margin: `0 auto ${isAI ? 'var(--space-10)' : 'var(--space-8)'}`,
                padding: '0 var(--space-4)'
            }}
            aria-label={isAI ? "AI Response" : "You said"}
        >
            <div
                className="message-content"
                style={{
                    background: isAI ? 'var(--grey-50)' : 'transparent',
                    padding: isAI ? 'var(--space-6)' : '0',
                    borderRadius: 'var(--radius-xl)',
                    border: isAI ? '1px solid var(--grey-100)' : 'none',
                    fontSize: isAI ? 'var(--text-base)' : 'var(--text-lg)',
                    fontWeight: isAI ? '400' : '500',
                    color: 'var(--grey-900)'
                }}
            >
                {isAI && metrics && (
                    <div className="metrics-bar" style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--grey-100)', paddingBottom: 'var(--space-4)' }}>
                        <div className="metric-item" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--grey-500)' }}>
                            <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '16px' }}>
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                            <span><strong>{metrics.confidence}%</strong> confidence</span>
                        </div>
                    </div>
                )}

                {thoughtProcess && thoughtProcess.length > 0 && (
                    <div className="thought-process" style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--grey-100)' }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--grey-400)', textTransform: 'uppercase', marginBottom: 'var(--space-4)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '12px', color: 'var(--grey-400)' }}>
                                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Clinical Reasoning Process
                        </div>
                        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {thoughtProcess.map((step, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.15, duration: 0.3 }}
                                    style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}
                                >
                                    <div style={{
                                        minWidth: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: 'var(--grey-900)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        marginTop: '2px'
                                    }}>
                                        {idx + 1}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--grey-900)', marginBottom: 'var(--space-1)' }}>
                                            {step.title}
                                        </div>
                                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-600)', lineHeight: '1.5' }}>
                                            {step.description}
                                        </div>
                                        {step.sources && step.sources.length > 0 && (
                                            <div style={{ marginTop: 'var(--space-2)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                                                {step.sources.map((src, srcIdx) => (
                                                    <span key={srcIdx} style={{ fontSize: '9px', color: 'var(--grey-400)', background: 'var(--grey-50)', padding: '2px 6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--grey-100)' }}>
                                                        {src}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.li>
                            ))}
                        </ol>
                    </div>
                )}

                <div className="message-text" style={{ lineHeight: '1.6' }}>
                    {content}
                </div>

                {isAI && sources && sources.length > 0 && (
                    <div className="source-citations" style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--grey-100)' }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--grey-400)', textTransform: 'uppercase', marginBottom: 'var(--space-3)', letterSpacing: '0.05em' }}>Clinical Sources</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {sources.map((source, idx) => (
                                <div key={idx} className="source-item" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-2)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--grey-100)' }}>
                                    <div className="trust-score" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '48px' }}>
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            border: `2px solid ${source.trustScore >= 90 ? '#10b981' : source.trustScore >= 75 ? '#f59e0b' : '#ef4444'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: '700',
                                            color: source.trustScore >= 90 ? '#10b981' : source.trustScore >= 75 ? '#f59e0b' : '#ef4444'
                                        }}>
                                            {source.trustScore}%
                                        </div>
                                        <span style={{ fontSize: '7px', color: 'var(--grey-400)', marginTop: '2px', textAlign: 'center' }}>{source.evidenceLevel}</span>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--grey-900)', marginBottom: '2px' }}>{source.citation}</div>
                                        {source.url && (
                                            <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9px', color: 'var(--grey-500)', textDecoration: 'none' }}>
                                                View Guideline →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isAI && (
                    <div className="trust-loop" style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', borderTop: '1px solid var(--grey-100)', paddingTop: 'var(--space-4)' }}>
                        <button
                            className="btn btn-xs feedback-btn"
                            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1.5)', padding: 'var(--space-1) var(--space-2)', background: 'transparent', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-md)', fontSize: '10px', color: 'var(--grey-500)', cursor: 'pointer' }}
                            title="This recommendation aligns with my clinical experience"
                        >
                            <span>👍</span> Verified
                        </button>
                        <button
                            className="btn btn-xs feedback-btn"
                            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1.5)', padding: 'var(--space-1) var(--space-2)', background: 'transparent', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-md)', fontSize: '10px', color: 'var(--grey-500)', cursor: 'pointer' }}
                            title="This information seems outdated or inaccurate"
                        >
                            <span>👎</span> Outdated
                        </button>
                    </div>
                )}
            </div>

            {/* Media Attachments */}
            {attachments && attachments.length > 0 && (
                <div className="message-attachments" style={{ marginTop: 'var(--space-4)' }}>
                    {attachments.map((attachment, idx) => {
                        const fileType = attachment.type?.split('/')[0];
                        const src = attachment.preview || attachment.url || URL.createObjectURL(attachment);

                        return (
                            <MediaDisplay
                                key={idx}
                                type={fileType}
                                src={src}
                                thumbnail={attachment.thumbnail}
                                fileName={attachment.name}
                                onLightboxOpen={handleLightboxOpen}
                            />
                        );
                    })}
                </div>
            )}

            {/* Image Lightbox */}
            {lightboxImages && (
                <ImageLightbox
                    images={lightboxImages}
                    currentIndex={lightboxIndex}
                    onClose={handleLightboxClose}
                />
            )}
        </motion.div>
    );
});

ChatMessage.displayName = 'ChatMessage';
export default ChatMessage;
