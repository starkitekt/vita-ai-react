import React, { useState, useRef, memo } from 'react';
import AttachmentPreview from './AttachmentPreview';
import VoiceRecorder from './VoiceRecorder';

const SUPPORTED_TYPES = {
    image: ['image/jpeg', 'image/png', 'image/heic', 'image/webp', 'image/gif'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/webm'],
    video: ['video/mp4', 'video/quicktime', 'video/webm']
};

const MAX_FILE_SIZES = {
    image: 10 * 1024 * 1024, // 10MB
    audio: 25 * 1024 * 1024, // 25MB
    video: 100 * 1024 * 1024 // 100MB
};

const ChatInput = memo(({ onSend }) => {
    const [value, setValue] = useState('');
    const [attachments, setAttachments] = useState([]);
    const fileInputRef = useRef(null);

    const validateFile = (file) => {
        const fileType = file.type.split('/')[0];
        const allSupportedTypes = [...SUPPORTED_TYPES.image, ...SUPPORTED_TYPES.audio, ...SUPPORTED_TYPES.video];

        if (!allSupportedTypes.includes(file.type)) {
            alert(`Unsupported file type: ${file.type}`);
            return false;
        }

        const maxSize = MAX_FILE_SIZES[fileType] || MAX_FILE_SIZES.image;
        if (file.size > maxSize) {
            alert(`File too large. Maximum size for ${fileType}: ${maxSize / (1024 * 1024)}MB`);
            return false;
        }

        return true;
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(validateFile);

        validFiles.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setAttachments(prev => [...prev, { ...file, preview: e.target.result }]);
                };
                reader.readAsDataURL(file);
            } else {
                setAttachments(prev => [...prev, file]);
            }
        });

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRecordingComplete = (audioFile) => {
        setAttachments(prev => [...prev, audioFile]);
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() || attachments.length > 0) {
            onSend({ text: value, attachments });
            setValue('');
            setAttachments([]);
        }
    };

    return (
        <div className="input-area" style={{ borderTop: '1px solid var(--grey-100)', background: 'white' }}>
            <AttachmentPreview attachments={attachments} onRemove={removeAttachment} />

            <div style={{ padding: 'var(--space-6)' }}>
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
                        alignItems: 'center',
                        gap: 'var(--space-2)'
                    }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*,video/*"
                        multiple
                        style={{ display: 'none' }}
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn btn-icon"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--grey-600)'
                        }}
                        title="Attach image or video"
                        aria-label="Attach file"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px' }}>
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                    </button>

                    <input
                        type="text"
                        className="chat-input"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Ask a follow-up question..."
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            padding: 'var(--space-3) var(--space-2)',
                            outline: 'none',
                            fontSize: 'var(--text-base)'
                        }}
                        aria-label="Ask Vita AI a question"
                    />

                    <VoiceRecorder onRecordingComplete={handleRecordingComplete} />

                    <button
                        type="submit"
                        className="btn btn-primary btn-icon"
                        disabled={!value.trim() && attachments.length === 0}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            opacity: (value.trim() || attachments.length > 0) ? 1 : 0.5,
                            cursor: (value.trim() || attachments.length > 0) ? 'pointer' : 'not-allowed'
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
        </div>
    );
});

ChatInput.displayName = 'ChatInput';
export default ChatInput;
