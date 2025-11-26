import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

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

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", isDangerous = false }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={styles.backdrop}
                    onClick={onCancel}
                >
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={styles.iconContainer}>
                            <AlertTriangle size={32} color={isDangerous ? "#ff4444" : "#d4af37"} />
                        </div>

                        <h3 style={styles.title}>{title}</h3>
                        <p style={styles.message}>{message}</p>

                        <div style={styles.actions}>
                            <button onClick={onCancel} style={styles.cancelBtn}>
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                style={{
                                    ...styles.confirmBtn,
                                    backgroundColor: isDangerous ? 'rgba(255, 68, 68, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                                    color: isDangerous ? '#ff4444' : '#d4af37',
                                    borderColor: isDangerous ? '#ff4444' : '#d4af37',
                                }}
                            >
                                {confirmText}
                            </button>
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    modal: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#1a1a1a',
        borderRadius: '16px',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    iconContainer: {
        marginBottom: '1.5rem',
        padding: '1rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    title: {
        margin: '0 0 0.5rem 0',
        fontSize: '1.5rem',
        color: '#fff',
        fontFamily: 'Playfair Display, serif',
    },
    message: {
        margin: '0 0 2rem 0',
        color: '#ccc',
        fontSize: '1rem',
        lineHeight: '1.5',
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        width: '100%',
    },
    cancelBtn: {
        flex: 1,
        padding: '0.8rem',
        backgroundColor: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: '#888',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.2s',
    },
    confirmBtn: {
        flex: 1,
        padding: '0.8rem',
        border: '1px solid',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'all 0.2s',
    }
};

export default ConfirmModal;
