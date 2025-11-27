import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ImageModal = ({ isOpen, mediaSrc, type, caption, onClose }) => {
    // Fallback type detection if not provided
    const isVideo = type === 'video' || (mediaSrc && (mediaSrc.endsWith('.mp4') || mediaSrc.startsWith('data:video')));
    const videoRef = useRef(null);

    // Handle visibility change for video
    useEffect(() => {
        if (!isOpen || !isVideo) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (videoRef.current && !videoRef.current.paused) {
                    videoRef.current.pause();
                    sessionStorage.setItem('was_video_playing', 'true');
                } else {
                    sessionStorage.setItem('was_video_playing', 'false');
                }
            } else {
                const wasPlaying = sessionStorage.getItem('was_video_playing') === 'true';
                if (wasPlaying && videoRef.current) {
                    videoRef.current.play().catch(e => console.log("Video resume failed:", e));
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isOpen, isVideo]);

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={styles.overlay}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        style={styles.content}
                    >
                        <button onClick={onClose} style={styles.closeButton}>
                            <X size={24} />
                        </button>

                        {isVideo ? (
                            <video
                                ref={videoRef}
                                src={mediaSrc}
                                controls
                                autoPlay
                                style={styles.media}
                            />
                        ) : (
                            <img
                                src={mediaSrc}
                                alt={caption || "Full screen view"}
                                style={styles.media}
                            />
                        )}

                        {caption && <div style={styles.caption}>{caption}</div>}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '2rem',
    },
    content: {
        position: 'relative',
        maxWidth: '90vw',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    media: {
        maxWidth: '100%',
        maxHeight: '80vh',
        objectFit: 'contain',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    },
    closeButton: {
        position: 'absolute',
        top: '-40px',
        right: 0,
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        padding: '0.5rem',
        zIndex: 10,
    },
    caption: {
        marginTop: '1rem',
        color: '#fff',
        fontSize: '1.1rem',
        textAlign: 'center',
        fontFamily: 'Playfair Display, serif',
    }
};

export default ImageModal;
