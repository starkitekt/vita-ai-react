import React, { useState, memo } from 'react';

const ChatInput = memo(({ onSend }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            onSend(value);
            setValue('');
        }
    };

    return (
        <div className="input-area" style={{ padding: 'var(--space-6)', borderTop: '1px solid var(--grey-100)', background: 'white' }}>
            <form
                onSubmit={handleSubmit}
                className="input-container"
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'var(--grey-50)',
                    border: '1px solid var(--grey-200)',
                    borderRadius: 'var(--radius-full)',
                    padding: 'var(--space-1) var(--space-2)',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <input
                    type="text"
                    className="chat-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Ask a follow-up question..."
                    style={{ flex: 1, background: 'transparent', border: 'none', padding: 'var(--space-3) var(--space-4)', outline: 'none', fontSize: 'var(--text-base)' }}
                    aria-label="Ask Vita AI a question"
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-icon"
                    disabled={!value.trim()}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        opacity: value.trim() ? 1 : 0.5,
                        cursor: value.trim() ? 'pointer' : 'not-allowed'
                    }}
                    aria-label="Send message"
                >
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px' }}>
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5,12 12,5 19,12" />
                    </svg>
                </button>
            </form>
        </div>
    );
});

ChatInput.displayName = 'ChatInput';
export default ChatInput;
