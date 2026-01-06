import React, { useState, useRef, memo } from 'react';

const VoiceRecorder = memo(({ onRecordingComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const file = new File([blob], `recording-${Date.now()}.webm`, { type: 'audio/webm' });
                onRecordingComplete(file);
                stream.getTracks().forEach(track => track.stop());
                setRecordingTime(0);
            };

            mediaRecorder.start();
            setIsRecording(true);

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className="btn btn-icon"
            style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isRecording ? '#ef4444' : 'transparent',
                color: isRecording ? 'white' : 'var(--grey-600)',
                border: isRecording ? 'none' : '1px solid var(--grey-200)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s'
            }}
            title={isRecording ? `Recording: ${formatTime(recordingTime)}` : 'Record voice message'}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
            {isRecording ? (
                <>
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px' }}>
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                    <span style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '10px',
                        whiteSpace: 'nowrap',
                        background: '#ef4444',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)'
                    }}>
                        {formatTime(recordingTime)}
                    </span>
                </>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px' }}>
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
            )}
        </button>
    );
});

VoiceRecorder.displayName = 'VoiceRecorder';
export default VoiceRecorder;
