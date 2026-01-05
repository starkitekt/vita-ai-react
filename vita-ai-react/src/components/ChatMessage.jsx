import React, { memo } from 'react';
import { motion } from 'framer-motion';

const ChatMessage = memo(({ role, content, metrics }) => {
    const isAI = role === 'ai';

    return (
        <motion.div
            className={`message ${role}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '800px', margin: `0 auto ${isAI ? 'var(--space-12)' : 'var(--space-8)'} auto` }}
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

                <div className="message-text" style={{ lineHeight: '1.6' }}>
                    {content}
                </div>
            </div>
        </motion.div>
    );
});

ChatMessage.displayName = 'ChatMessage';
export default ChatMessage;
