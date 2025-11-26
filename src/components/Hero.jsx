import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import heroBg from '../assets/hero-bg.jpg';
import { ChevronDown } from 'lucide-react';

// Configuration for Hero Text
const heroConfig = {
    subtitle: {
        text: "Celebrating Love, Family, and Togetherness",
        fontFamily: "'Inter', sans-serif",
        fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
        letterSpacing: "0.3em",
        color: "#f0f0f0",
    }
};

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        // Check session storage for animation state
        const played = sessionStorage.getItem('hero_played');
        if (played) {
            setHasPlayed(true);
        } else {
            sessionStorage.setItem('hero_played', 'true');
        }

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Parallax Effects
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // Smooth spring for parallax
    const smoothYText = useSpring(yText, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: hasPlayed ? 0 : 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        }
    };

    const imageRevealVariants = {
        hidden: { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
        visible: {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            transition: {
                duration: hasPlayed ? 0 : 1.5, // Instant if played
                ease: [0.22, 1, 0.36, 1],
                delay: hasPlayed ? 0 : 0.2
            }
        }
    };

    const styles = getStyles(isMobile);

    return (
        <section ref={ref} style={styles.hero}>
            {/* Background Parallax Layer - Acts as the blurred backdrop */}
            <motion.div
                style={{ ...styles.bgLayer, y: yBg, scale: scaleImg }}
            >
                <div style={styles.blurredBg} />
                <div style={styles.overlay} />
            </motion.div>

            {/* Main Content Flex Container */}
            <div style={styles.container}>

                {/* Image Section (Center) */}
                <div style={styles.imageSection}>
                    <motion.div
                        variants={imageRevealVariants}
                        initial={hasPlayed ? "visible" : "hidden"}
                        animate="visible"
                        style={styles.imageContainer}
                    >
                        <img
                            src={heroBg}
                            alt="Family"
                            style={styles.mainImage}
                        />
                        <div style={styles.imageGlow} />
                    </motion.div>
                </div>

                {/* Subtitle Section (Bottom) */}
                <motion.div
                    style={{
                        ...styles.subtitleSection,
                        y: isMobile ? 0 : smoothYText,
                        opacity: opacityText
                    }}
                    variants={containerVariants}
                    initial={hasPlayed ? "visible" : "hidden"}
                    animate="visible"
                >
                    <motion.div variants={itemVariants} style={styles.subtitleWrapper}>
                        <div style={styles.line} />
                        <motion.p style={styles.subtitle} variants={containerVariants}>
                            {heroConfig.subtitle.text.split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                type: "spring",
                                                damping: 12,
                                                stiffness: 100
                                            }
                                        }
                                    }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.p>
                        <div style={styles.line} />
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                style={styles.scrollIndicator}
            >
                <ChevronDown color="rgba(255,255,255,0.5)" size={32} />
            </motion.div>
        </section>
    );
};

const getStyles = (isMobile) => ({
    hero: {
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '120%', // Taller for parallax
        zIndex: 0,
    },
    blurredBg: {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(30px) brightness(0.4)',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, #050505 90%)',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
        zIndex: 10,
        position: 'relative',
        padding: isMobile ? '2rem 1rem 2rem 1rem' : '4rem 2rem', // Reduced top padding
        justifyContent: 'center', // Center everything vertically
        alignItems: 'center',
    },
    imageSection: {
        flex: 1, // Take up remaining space
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden', // Contain image within this section
        padding: isMobile ? '0' : '0 2rem',
        marginBottom: isMobile ? '1rem' : '0', // Slight space below image on mobile
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: isMobile ? '100%' : '1000px', // Wider on desktop
        maxHeight: isMobile ? '50vh' : '60vh', // Limit height on desktop
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain', // Ensure full image is visible
        filter: 'contrast(1.1) saturate(1.1)', // Cinematic pop
    },
    imageGlow: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%)',
        pointerEvents: 'none',
    },
    subtitleSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: isMobile ? '0.5rem' : '2rem', // Closer to image on mobile
        marginBottom: isMobile ? '4rem' : '1rem', // Space for scroll indicator
        flexShrink: 0,
        zIndex: 20,
    },
    subtitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexDirection: isMobile ? 'column' : 'row',
    },
    subtitle: {
        fontFamily: heroConfig.subtitle.fontFamily,
        fontSize: heroConfig.subtitle.fontSize,
        letterSpacing: heroConfig.subtitle.letterSpacing,
        color: heroConfig.subtitle.color,
        textTransform: 'uppercase',
        margin: 0,
        opacity: 0.8,
        textAlign: 'center',
    },
    line: {
        height: '1px',
        width: isMobile ? '50px' : '80px',
        background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
        opacity: 0.6,
    },
    scrollIndicator: {
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        translateX: '-50%',
        zIndex: 20,
        cursor: 'pointer',
    }
});

export default Hero;
