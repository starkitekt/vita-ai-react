import React, { memo } from 'react';
import { motion } from 'framer-motion';

const UploadProgress = memo(({ fileName, progress, uploadSpeed, fileSize, onCancel }) => {
    const formatSpeed = (bytesPerSecond) => {
        if (!bytesPerSecond) return '0 B/s';
        if (bytesPerSecond < 1024) return `${bytesPerSecond.toFixed(0)} B/s`;
        if (bytesPerSecond < 1024 * 1024) return `${(bytesPerSecond / 1024).toFixed(1)} KB/s`;
        return `${(bytesPerSecond / (1024 * 1024)).toFixed(1)} MB/s`;
    };

    const formatSize = (bytes) => {
        if (!bytes) return '0 B';
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const estimateTimeRemaining = () => {
        if (!uploadSpeed || progress >= 100) return null;
        const remainingBytes = fileSize * ((100 - progress) / 100);
        const secondsRemaining = remainingBytes / uploadSpeed;

        if (secondsRemaining < 60) return `${Math.ceil(secondsRemaining)} seconds`;
        return `${Math.ceil(secondsRemaining / 60)} minutes`;
    };

    const timeRemaining = estimateTimeRemaining();

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
                background: 'var(--grey-50)',
                border: '1px solid var(--grey-200)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3)',
                marginBottom: 'var(--space-2)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: '600',
                        color: 'var(--grey-900)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {fileName}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--grey-400)', marginTop: '2px' }}>
                        {formatSize(fileSize)}
                    </div>
                </div>

                {onCancel && (
                    <button
                        onClick={onCancel}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 'var(--space-1)',
                            color: 'var(--grey-400)',
                            fontSize: '18px',
                            lineHeight: 1,
                            marginLeft: 'var(--space-2)'
                        }}
                        aria-label="Cancel upload"
                    >
                        ×
                    </button>
                )}
            </div>

            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '6px',
                background: 'var(--grey-200)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                marginBottom: 'var(--space-2)'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    style={{
                        height: '100%',
                        background: progress >= 100 ? '#10b981' : 'var(--grey-900)',
                        borderRadius: 'var(--radius-full)'
                    }}
                />
            </div>

            {/* Progress Info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: 'var(--grey-500)' }}>
                <div>
                    {progress >= 100 ? (
                        <span style={{ color: '#10b981', fontWeight: '600' }}>✓ Complete</span>
                    ) : (
                        <>
                            <span style={{ fontWeight: '600' }}>{progress.toFixed(0)}%</span>
                            {uploadSpeed && <span> • {formatSpeed(uploadSpeed)}</span>}
                        </>
                    )}
                </div>
                {timeRemaining && progress < 100 && (
                    <div>{timeRemaining} remaining</div>
                )}
            </div>
        </motion.div>
    );
});

UploadProgress.displayName = 'UploadProgress';
export default UploadProgress;
