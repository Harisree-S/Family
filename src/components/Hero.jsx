import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/hero-bg.jpg';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={ref} style={styles.hero}>
            <motion.div style={{ ...styles.bgImage, backgroundImage: `url(${heroBg})`, y: yBg }} />
            <div style={styles.overlay}></div>
            <motion.div className="container" style={{ ...styles.content, y: yText }}>
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={styles.title}
                >
                    ലളിതം സുന്ദരം
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    style={styles.subtitle}
                >
                    Celebrating Love, Family, and Togetherness
                </motion.p>
            </motion.div>
        </section>
    );
};

const styles = {
    hero: {
        height: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        overflow: 'hidden',
        textAlign: 'center',
    },
    bgImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
    },
    content: {
        position: 'relative',
        zIndex: 2,
        padding: '0 20px', // Added padding so text doesn't touch edges on mobile
    },
    title: {
        fontSize: 'clamp(3.5rem, 9vw, 8rem)', // Made slightly bigger
        marginBottom: '1rem',
        fontFamily: 'Playfair Display, serif',
        fontWeight: '700',

        // --- GOLDEN GRADIENT STYLES ---
        background: 'linear-gradient(to bottom, #FFD700, #FDB931)', // Gold gradient
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.6))', // Drop shadow specifically for gradient text
        // -----------------------------
    },
    subtitle: {
        fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
        fontFamily: 'Inter, sans-serif',
        maxWidth: '700px',
        margin: '0 auto',
        color: '#f0f0f0',

        // --- CINEMATIC STYLES ---
        letterSpacing: '5px', // Widened spacing for elegance
        textTransform: 'uppercase',
        fontWeight: '300', // Thinner font looks more expensive
        opacity: 0.9,
        // ------------------------
    }
};

export default Hero;