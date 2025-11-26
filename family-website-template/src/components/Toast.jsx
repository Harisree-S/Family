import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

// Simple Event Bus for triggering toasts
const toastBus = {
    listeners: [],
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    },
    emit(message, type = 'success') {
        this.listeners.forEach(l => l(message, type));
    }
};

export const showToast = (message, type = 'success') => {
    toastBus.emit(message, type);
};

const ToastItem = ({ id, message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 4000);
        return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            style={{
                ...styles.toast,
                borderLeft: `4px solid ${type === 'success' ? '#4caf50' : '#ff4444'}`
            }}
        >
            <div style={styles.icon}>
                {type === 'success' ? (
                    <CheckCircle size={20} color="#4caf50" />
                ) : (
                    <AlertCircle size={20} color="#ff4444" />
                )}
            </div>
            <div style={styles.content}>
                <p style={styles.message}>{message}</p>
            </div>
            <button onClick={() => onClose(id)} style={styles.closeBtn}>
                <X size={16} />
            </button>
        </motion.div>
    );
};

export const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const removeListener = toastBus.subscribe((message, type) => {
            const id = Date.now();
            setToasts(prev => [...prev, { id, message, type }]);
        });
        return removeListener;
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div style={styles.container}>
            <AnimatePresence>
                {toasts.map(toast => (
                    <ToastItem
                        key={toast.id}
                        {...toast}
                        onClose={removeToast}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none',
    },
    toast: {
        pointerEvents: 'auto',
        minWidth: '320px',
        backgroundColor: '#0a0a0a',
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        color: '#fff',
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    message: {
        margin: 0,
        fontSize: '0.95rem',
        fontWeight: '500',
        letterSpacing: '0.02em',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#666',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s',
        opacity: 0.7,
    }
};
