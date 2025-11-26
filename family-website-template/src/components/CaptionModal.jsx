import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: {
        scale: 0.8,
        opacity: 0,
        y: 50
    },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    exit: {
        scale: 0.8,
        opacity: 0,
        y: 50,
        transition: { duration: 0.2 }
    }
};

const CaptionModal = ({ isOpen, onClose, onSave, initialCaption = '', title = 'Add Caption' }) => {
    const [caption, setCaption] = useState(initialCaption);

    useEffect(() => {
        if (isOpen) {
            setCaption(initialCaption);
        }
    }, [isOpen, initialCaption]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(caption);
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
                            <h2 style={styles.title}>{title}</h2>
                            <button onClick={onClose} style={styles.closeBtn}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <input
                                type="text"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Enter a beautiful caption..."
                                style={styles.input}
                                autoFocus
                            />
                            <div style={styles.actions}>
                                <button type="button" onClick={onClose} style={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button type="submit" style={styles.saveBtn}>
                                    Save
                                </button>
                            </div>
                        </form>
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    modal: {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: 'rgba(20, 20, 20, 0.95)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        padding: '2rem',
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '1.5rem',
        color: '#d4af37',
        fontFamily: 'Playfair Display, serif',
        margin: 0,
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#888',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    input: {
        width: '100%',
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '1.1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
    },
    cancelBtn: {
        padding: '0.8rem 1.5rem',
        backgroundColor: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: '#ccc',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.2s',
    },
    saveBtn: {
        padding: '0.8rem 2rem',
        backgroundColor: '#d4af37',
        border: 'none',
        borderRadius: '8px',
        color: '#000',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1rem',
        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
        transition: 'all 0.2s',
    }
};

export default CaptionModal;
