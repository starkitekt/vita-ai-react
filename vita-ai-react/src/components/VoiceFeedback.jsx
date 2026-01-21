import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

const VoiceFeedback = ({ text, autoRead = false, onComplete }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const utteranceRef = useRef(null);

    const speak = () => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utteranceRef.current = utterance;

            // Voice settings optimized for medical terminology
            utterance.rate = 0.95; // Slightly slower for clarity
            utterance.pitch = 1.0;
            utterance.volume = 0.9;
            utterance.lang = 'en-IN'; // Indian English

            // Try to use a specific voice if available
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice =>
                voice.lang.startsWith('en') &&
                (voice.name.includes('Google') || voice.name.includes('Microsoft'))
            );
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            utterance.onstart = () => {
                setIsSpeaking(true);
            };

            utterance.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
                if (onComplete) onComplete();
            };

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                setIsSpeaking(false);
                setIsPaused(false);
            };

            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('Speech synthesis not supported');
            alert('Text-to-speech not supported in this browser');
        }
    };

    const pause = () => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const resume = () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    // Auto-read on mount if enabled
    useEffect(() => {
        if (autoRead && text) {
            // Small delay to ensure component is rendered
            const timer = setTimeout(() => speak(), 300);
            return () => clearTimeout(timer);
        }
    }, [autoRead, text]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2)',
            background: isSpeaking ? 'var(--grey-50)' : 'transparent',
            borderRadius: 'var(--radius-md)',
            transition: 'all 0.2s'
        }}>
            {isSpeaking ? (
                <>
                    {isPaused ? (
                        <button
                            onClick={resume}
                            className="btn btn-icon"
                            title="Resume reading"
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'var(--grey-200)',
                                color: 'var(--grey-700)',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <Play size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={pause}
                            className="btn btn-icon"
                            title="Pause reading"
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'var(--grey-200)',
                                color: 'var(--grey-700)',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <Pause size={16} />
                        </button>
                    )}
                    <button
                        onClick={stop}
                        className="btn btn-icon"
                        title="Stop reading"
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <VolumeX size={16} />
                    </button>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--grey-600)'
                    }}>
                        <div className="sound-bars" style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: '3px',
                                        height: `${8 + i * 4}px`,
                                        background: '#10b981',
                                        borderRadius: '2px',
                                        animation: `soundBar 0.8s ease-in-out ${i * 0.1}s infinite alternate`
                                    }}
                                />
                            ))}
                        </div>
                        <span>{isPaused ? 'Paused' : 'Reading aloud...'}</span>
                    </div>
                </>
            ) : (
                <button
                    onClick={speak}
                    className="btn btn-icon"
                    title="Read this response aloud"
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'transparent',
                        color: 'var(--grey-500)',
                        border: '1px solid var(--grey-200)', cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--grey-100)';
                        e.currentTarget.style.color = 'var(--grey-700)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--grey-500)';
                    }}
                >
                    <Volume2 size={16} />
                </button>
            )}

            <style>{`
                @keyframes soundBar {
                    0% { transform: scaleY(0.3); }
                    100% { transform: scaleY(1); }
                }
            `}</style>
        </div>
    );
};

export default VoiceFeedback;
