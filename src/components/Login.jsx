import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onLogin(password)) {
            setError(false);
        } else {
            setError(true);
            // Reset error animation after a brief moment
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={styles.card}
            >
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={styles.iconWrapper}
                >
                    <Lock size={32} color="#d4af37" />
                </motion.div>

                <h1 style={styles.title}>Lalitham Sundharam</h1>
                <p style={styles.subtitle}>Private Family Access</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <motion.div
                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        style={{ width: '100%' }}
                    >
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            style={{
                                ...styles.input,
                                borderColor: error ? '#ff4444' : '#333'
                            }}
                            autoFocus
                        />
                    </motion.div>

                    <button
                        type="submit"
                        style={styles.button}
                    >
                        Enter
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050505',
        position: 'relative',
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
    },
    iconWrapper: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        backgroundColor: 'rgba(212, 175, 55, 0.05)',
    },
    title: {
        fontFamily: 'Playfair Display, serif',
        fontSize: '2rem',
        color: '#d4af37',
        marginBottom: '0.5rem',
        textAlign: 'center',
    },
    subtitle: {
        color: '#888',
        fontSize: '0.9rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '3rem',
        textAlign: 'center',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid #333',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '1rem',
        textAlign: 'center',
        outline: 'none',
        transition: 'all 0.3s ease',
    },
    button: {
        padding: '0.8rem 3rem',
        backgroundColor: '#d4af37',
        color: '#000',
        border: 'none',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
    }
};

export default Login;
