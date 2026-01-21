import React, { useState, useRef, useEffect, memo } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send } from 'lucide-react';

const VoiceFirstInput = memo(({ onSend, onVoiceQuery }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [autoReadResponses, setAutoReadResponses] = useState(true);
    const [textInput, setTextInput] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Detect mobile/desktop
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            if (navigator.vibrate) navigator.vibrate(50);
            if (voiceEnabled) playFeedbackSound('start');

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const file = new File([blob], `voice-query-${Date.now()}.webm`, { type: 'audio/webm' });

                if (navigator.vibrate) navigator.vibrate(30);
                if (voiceEnabled) playFeedbackSound('end');
                stream.getTracks().forEach(track => track.stop());
                setRecordingTime(0);

                setIsProcessing(true);
                if (onVoiceQuery) await onVoiceQuery(file);
                setIsProcessing(false);
            };

            mediaRecorder.start();
            setIsRecording(true);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error('Microphone access error:', error);
            alert('Could not access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        }
    };

    const playFeedbackSound = (type) => {
        if (!voiceEnabled) return;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = type === 'start' ? 800 : 600;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.1;

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (textInput.trim() && onSend) {
            onSend({ text: textInput, attachments: [] });
            setTextInput('');
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    // Desktop Professional Layout
    if (!isMobile) {
        return (
            <div style={{
                borderTop: '1px solid var(--grey-100)',
                background: 'white',
                padding: 'var(--space-4) var(--space-6)'
            }}>
                {/* Settings bar - minimal */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-3)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--grey-500)'
                }}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button
                            onClick={() => setVoiceEnabled(!voiceEnabled)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-1)',
                                padding: 'var(--space-1)',
                                color: voiceEnabled ? 'var(--grey-600)' : 'var(--grey-400)',
                                fontSize: 'var(--text-xs)'
                            }}
                            title={voiceEnabled ? "Sound feedback enabled" : "Sound feedback disabled"}
                        >
                            {voiceEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
                        </button>
                        <button
                            onClick={() => setAutoReadResponses(!autoReadResponses)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 'var(--space-1)',
                                fontSize: 'var(--text-xs)',
                                color: autoReadResponses ? 'var(--grey-600)' : 'var(--grey-400)'
                            }}
                            title="Auto-read AI responses"
                        >
                            {autoReadResponses ? '🔊' : '🔇'}
                        </button>
                    </div>
                    {isRecording && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            color: '#ef4444',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-sm)'
                        }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#ef4444',
                                animation: 'pulse 2s infinite'
                            }} />
                            Recording {formatTime(recordingTime)}
                        </div>
                    )}
                </div>

                {/* Professional inline input bar */}
                <form onSubmit={handleTextSubmit} style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'var(--grey-50)',
                    border: '1px solid var(--grey-200)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    transition: 'border-color 0.2s'
                }}>
                    {/* Voice button - compact, professional */}
                    <button
                        type="button"
                        onMouseDown={!isProcessing ? startRecording : null}
                        onMouseUp={stopRecording}
                        onMouseLeave={stopRecording}
                        disabled={isProcessing}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: isRecording ? '#ef4444' : isProcessing ? '#3b82f6' : 'var(--grey-900)',
                            border: 'none',
                            cursor: isProcessing ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            transition: 'all 0.2s',
                            flexShrink: 0
                        }}
                        title="Hold to record voice query"
                    >
                        {isProcessing ? (
                            <div className="spinner" style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderTop: '2px solid white',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                        ) : isRecording ? (
                            <MicOff size={20} />
                        ) : (
                            <Mic size={20} />
                        )}
                    </button>

                    {/* Text input */}
                    <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder={isRecording ? "Recording..." : isProcessing ? "Processing..." : "Ask a clinical question or hold mic to speak..."}
                        disabled={isRecording || isProcessing}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            padding: 'var(--space-2)',
                            outline: 'none',
                            fontSize: 'var(--text-base)',
                            color: 'var(--grey-900)'
                        }}
                    />

                    {/* Send button */}
                    <button
                        type="submit"
                        disabled={!textInput.trim() || isRecording || isProcessing}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: textInput.trim() ? 'var(--grey-900)' : 'transparent',
                            border: 'none',
                            cursor: textInput.trim() ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: textInput.trim() ? 'white' : 'var(--grey-400)',
                            transition: 'all 0.2s',
                            flexShrink: 0,
                            opacity: textInput.trim() ? 1 : 0.5
                        }}
                        title="Send message"
                    >
                        <Send size={18} />
                    </button>
                </form>

                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Mobile Touch-Friendly Layout
    return (
        <div style={{
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)'
        }}>
            {/* Settings */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-xs)'
            }}>
                <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    style={{
                        background: voiceEnabled ? 'var(--grey-100)' : 'transparent',
                        border: '1px solid var(--grey-200)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-1) var(--space-2)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)'
                    }}
                >
                    {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    Sound
                </button>
            </div>

            {/* Large touch button for mobile */}
            <div
                style={{
                    width: '100%',
                    aspectRatio: '1',
                    maxWidth: '220px',
                    margin: '0 auto'
                }}
                onTouchStart={!isProcessing ? startRecording : null}
                onTouchEnd={stopRecording}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: isRecording
                        ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                        : isProcessing
                            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isProcessing ? 'wait' : 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    userSelect: 'none'
                }}>
                    {isProcessing ? (
                        <>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                border: '4px solid rgba(255,255,255,0.3)',
                                borderTop: '4px solid white',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                            <div style={{ color: 'white', marginTop: 'var(--space-2)', fontWeight: '600' }}>
                                Processing...
                            </div>
                        </>
                    ) : isRecording ? (
                        <>
                            <MicOff size={56} color="white" />
                            <div style={{ color: 'white', marginTop: 'var(--space-2)', fontWeight: '600', fontSize: 'var(--text-lg)' }}>
                                {formatTime(recordingTime)}
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'var(--text-sm)' }}>
                                Release to send
                            </div>
                        </>
                    ) : (
                        <>
                            <Mic size={64} color="white" />
                            <div style={{ color: 'white', marginTop: 'var(--space-2)', fontWeight: '600' }}>
                                Tap & Hold
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div style={{
                textAlign: 'center',
                fontSize: 'var(--text-sm)',
                color: 'var(--grey-500)'
            }}>
                {isRecording ? 'Recording... speak your question' : isProcessing ? 'Processing...' : 'Tap button to speak'}
            </div>

            {/* Mobile text input fallback */}
            <div style={{
                marginTop: 'var(--space-4)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--grey-200)'
            }}>
                <form onSubmit={handleTextSubmit} style={{
                    display: 'flex',
                    gap: 'var(--space-2)'
                }}>
                    <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Or type your question..."
                        style={{
                            flex: 1,
                            background: 'var(--grey-50)',
                            border: '1px solid var(--grey-200)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--space-3)',
                            outline: 'none',
                            fontSize: 'var(--text-base)'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!textInput.trim()}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: textInput.trim() ? 'var(--grey-900)' : 'var(--grey-200)',
                            border: 'none',
                            cursor: textInput.trim() ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
});

VoiceFirstInput.displayName = 'VoiceFirstInput';
export default VoiceFirstInput;
