import React from 'react';
import { motion } from 'framer-motion';

const BackgroundParticles = () => {
    return (
        <div style={styles.container}>
            <div style={styles.gradientMesh} />
            <div style={styles.noise} />
            {/* Floating Orbs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ ...styles.orb, top: '20%', left: '20%', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)' }}
            />
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ ...styles.orb, bottom: '20%', right: '20%', background: 'radial-gradient(circle, rgba(188, 19, 254, 0.05) 0%, transparent 70%)' }}
            />
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#030305',
    },
    gradientMesh: {
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #030305 100%)',
    },
    noise: {
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
    },
    orb: {
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        filter: 'blur(80px)',
    }
};

export default BackgroundParticles;
