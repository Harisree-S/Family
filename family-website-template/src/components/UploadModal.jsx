import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { scale: 0.9, opacity: 0, y: 20 }
};

const UploadModal = ({ isOpen, onClose, onSave, file, type, aspectRatio = 1, borderRadius = '8px', overlayStyle = null }) => {
    const [caption, setCaption] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);

    useEffect(() => {
        if (isOpen) {
            setCaption('');
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            caption,
            scale: 1,
            position: 'center'
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={styles.backdrop}
                    onClick={onClose}
                >
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={styles.header}>
                            <h2 style={styles.title}>
                                {type === 'image' ? 'Edit Photo' : 'Upload Video'}
                            </h2>
                            <button onClick={onClose} style={styles.closeBtn}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={styles.content}>
                            {/* Preview Area */}
                            <div
                                style={{
                                    ...styles.previewContainer,
                                    aspectRatio: aspectRatio,
                                    borderRadius: borderRadius,
                                    height: 'auto',
                                    maxHeight: '50vh'
                                }}
                            >
                                {previewUrl && (
                                    type === 'image' ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            style={styles.previewImage}
                                            draggable={false}
                                        />
                                    ) : (
                                        <video
                                            src={previewUrl}
                                            style={styles.previewVideo}
                                            controls
                                        />
                                    )
                                )}

                                {/* Simulated Overlay for Exact Preview */}
                                {overlayStyle && <div style={overlayStyle} />}
                            </div>

                            {/* Controls */}
                            <div style={styles.controls}>
                                <div style={styles.controlGroup}>
                                    <input
                                        type="text"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        placeholder="Write a beautiful caption..."
                                        style={styles.input}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div style={styles.actions}>
                                <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
                                <button onClick={handleSubmit} style={styles.saveBtn}>Upload</button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const styles = {
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    modal: {
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#1a1a1a',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh',
    },
    header: {
        padding: '1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '1.25rem',
        color: '#d4af37',
        fontFamily: 'Playfair Display, serif',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#888',
        cursor: 'pointer',
        padding: '0.5rem',
    },
    content: {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        overflowY: 'auto',
    },
    previewContainer: {
        width: '100%',
        backgroundColor: '#000',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none',
    },
    previewVideo: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    controls: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    controlGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    input: {
        width: '100%',
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '1rem',
        outline: 'none',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '1rem',
    },
    cancelBtn: {
        padding: '0.8rem 1.5rem',
        backgroundColor: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: '#ccc',
        cursor: 'pointer',
    },
    saveBtn: {
        padding: '0.8rem 2rem',
        backgroundColor: '#d4af37',
        border: 'none',
        borderRadius: '8px',
        color: '#000',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
};

export default UploadModal;
