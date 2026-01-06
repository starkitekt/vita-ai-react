import React, { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageLightbox = memo(({ images, currentIndex, onClose }) => {
    const [index, setIndex] = React.useState(currentIndex || 0);
    const [isZoomed, setIsZoomed] = React.useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrevious();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [index]);

    const handlePrevious = () => {
        if (index > 0) setIndex(index - 1);
    };

    const handleNext = () => {
        if (index < images.length - 1) setIndex(index + 1);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = images[index];
        link.download = `image-${index + 1}.jpg`;
        link.click();
    };

    if (!images || images.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.95)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-8)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-6)',
                        right: 'var(--space-6)',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontSize: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                    }}
                    aria-label="Close lightbox"
                >
                    ×
                </button>

                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-6)',
                        right: 'calc(var(--space-6) + 64px)',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                    }}
                    aria-label="Download image"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </button>

                {/* Image */}
                <motion.img
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: isZoomed ? 1.5 : 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={images[index]}
                    alt={`Image ${index + 1}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomed(!isZoomed);
                    }}
                    style={{
                        maxWidth: isZoomed ? 'none' : '90%',
                        maxHeight: isZoomed ? 'none' : '90%',
                        objectFit: 'contain',
                        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                        transition: 'transform 0.3s'
                    }}
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevious();
                            }}
                            disabled={index === 0}
                            style={{
                                position: 'absolute',
                                left: 'var(--space-6)',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                cursor: index === 0 ? 'not-allowed' : 'pointer',
                                opacity: index === 0 ? 0.3 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label="Previous image"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px' }}>
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            disabled={index === images.length - 1}
                            style={{
                                position: 'absolute',
                                right: 'var(--space-6)',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                cursor: index === images.length - 1 ? 'not-allowed' : 'pointer',
                                opacity: index === images.length - 1 ? 0.3 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label="Next image"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px' }}>
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: 'var(--space-6)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: 'var(--space-2) var(--space-4)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: '600'
                    }}>
                        {index + 1} / {images.length}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
});

ImageLightbox.displayName = 'ImageLightbox';
export default ImageLightbox;
