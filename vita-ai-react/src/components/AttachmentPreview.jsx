import React, { memo } from 'react';

const AttachmentPreview = memo(({ attachments, onRemove }) => {
    if (!attachments || attachments.length === 0) return null;

    const getFileIcon = (type) => {
        if (type.startsWith('image/')) return '🖼️';
        if (type.startsWith('audio/')) return '🎵';
        if (type.startsWith('video/')) return '🎬';
        return '📎';
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="attachment-preview" style={{
            display: 'flex',
            gap: 'var(--space-2)',
            padding: 'var(--space-3)',
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--grey-100)'
        }}>
            {attachments.map((file, idx) => (
                <div key={idx} className="attachment-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-2) var(--space-3)',
                    background: 'var(--grey-50)',
                    border: '1px solid var(--grey-200)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--text-xs)'
                }}>
                    {file.type.startsWith('image/') && file.preview ? (
                        <img
                            src={file.preview}
                            alt={file.name}
                            style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'cover',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                    ) : (
                        <span style={{ fontSize: '24px' }}>{getFileIcon(file.type)}</span>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                            fontWeight: '600',
                            color: 'var(--grey-900)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '150px'
                        }}>
                            {file.name}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--grey-400)' }}>
                            {formatFileSize(file.size)}
                        </div>
                    </div>
                    <button
                        onClick={() => onRemove(idx)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 'var(--space-1)',
                            color: 'var(--grey-400)',
                            fontSize: '16px',
                            lineHeight: 1
                        }}
                        aria-label="Remove attachment"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
});

AttachmentPreview.displayName = 'AttachmentPreview';
export default AttachmentPreview;
