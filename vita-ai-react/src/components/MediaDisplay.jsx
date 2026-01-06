import React, { memo } from 'react';

const MediaDisplay = memo(({ type, src, thumbnail, fileName, onLightboxOpen }) => {
    if (type === 'image') {
        return (
            <div
                className="media-image"
                onClick={() => onLightboxOpen && onLightboxOpen(src)}
                style={{
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    marginTop: 'var(--space-3)',
                    maxWidth: '400px'
                }}
            >
                <img
                    src={src}
                    alt={fileName || 'Uploaded image'}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.02)'
                        }
                    }}
                />
                <div style={{
                    fontSize: '10px',
                    color: 'var(--grey-400)',
                    padding: 'var(--space-2)',
                    background: 'var(--grey-50)',
                    textAlign: 'center'
                }}>
                    Click to view full size
                </div>
            </div>
        );
    }

    if (type === 'audio') {
        return (
            <div className="media-audio" style={{ marginTop: 'var(--space-3)' }}>
                <audio
                    controls
                    src={src}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: 'var(--radius-lg)'
                    }}
                >
                    Your browser does not support audio playback.
                </audio>
            </div>
        );
    }

    if (type === 'video') {
        return (
            <div className="media-video" style={{ marginTop: 'var(--space-3)' }}>
                <video
                    controls
                    src={src}
                    poster={thumbnail}
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--grey-900)'
                    }}
                >
                    Your browser does not support video playback.
                </video>
            </div>
        );
    }

    return null;
});

MediaDisplay.displayName = 'MediaDisplay';
export default MediaDisplay;
