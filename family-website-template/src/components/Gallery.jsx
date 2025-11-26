import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memories } from '../data/memoryData';
import { getCoverOverride } from '../utils/mediaStore';
import clickAudio from '../assets/audio/click.mp3';
import { useAudio } from './AudioController';

const MemoryTile = ({ memory, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [coverOverride, setCoverOverride] = useState(null);
    const isNavigatingRef = useRef(false);
    const { playSfx } = useAudio();

    useEffect(() => {
        getCoverOverride(memory.id, 'memory').then(cover => {
            if (cover) setCoverOverride(cover);
        });
    }, [memory.id]);

    // Determine display image and style
    const displayImage = coverOverride ? coverOverride.url : memory.cover;
    const displayStyle = coverOverride ? {
        objectPosition: coverOverride.position,
        transform: `scale(${coverOverride.scale})`
    } : {
        objectPosition: memory.coverPosition || '50% 20%', // Smart default: Top-Center
        transform: `scale(${memory.coverScale || 1})`,
        filter: 'contrast(1.05) saturate(1.1)' // Cinematic look
    };

    // Animation Variants
    const tileVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 50, damping: 20 }
        }
    };

    return (
        <Link
            to={`/memory/${memory.id}`}
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
                const isTouch = window.matchMedia("(pointer: coarse)").matches;
                if (isTouch && !isHovered) {
                    e.preventDefault();
                    setIsHovered(true);
                } else {
                    playSfx(clickAudio);
                    isNavigatingRef.current = true;
                }
            }}
        >
            <motion.div
                variants={tileVariants}
                style={styles.item}
                animate={isHovered ? "hover" : "initial"}
                initial="initial"
                onHoverStart={() => !window.matchMedia("(pointer: coarse)").matches && setIsHovered(true)}
                onHoverEnd={() => !window.matchMedia("(pointer: coarse)").matches && setIsHovered(false)}
            >
                <div style={styles.imageWrapper}>
                    <motion.img
                        src={displayImage}
                        alt={memory.title}
                        style={{
                            ...styles.image,
                            ...displayStyle
                        }}
                        variants={{
                            initial: { scale: 1, filter: 'brightness(0.9)' },
                            hover: { scale: 1.1, filter: 'brightness(1.1)' }
                        }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    />

                    {/* Cinematic Overlay */}
                    <motion.div
                        style={styles.cinematicOverlay}
                        variants={{
                            initial: { opacity: 0 },
                            hover: { opacity: 1 }
                        }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                <div style={styles.contentOverlay}>
                    <motion.div
                        variants={{
                            initial: { y: 20, opacity: 0.8 },
                            hover: { y: 0, opacity: 1 }
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <h3 style={styles.title}>{memory.title}</h3>
                        <div style={styles.line} />
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
};

const Gallery = () => {
    const sortedMemories = [...memories].sort((a, b) => a.id - b.id);

    return (
        <section style={styles.section}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                    style={styles.sectionTitle}
                >
                    Memories
                </motion.h2>
                <motion.div
                    style={styles.grid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {sortedMemories.map((memory, index) => (
                        <MemoryTile key={memory.id} memory={memory} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '8rem 0',
        backgroundColor: '#050505',
        position: 'relative',
    },
    sectionTitle: {
        marginBottom: '4rem',
        textAlign: 'center',
        fontSize: '3rem',
        fontFamily: "'Playfair Display', serif",
        color: '#d4af37',
        background: 'linear-gradient(to bottom, #d4af37, #aa8c2c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '0 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
    },
    item: {
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        position: 'relative',
        aspectRatio: '3/4',
        backgroundColor: '#111',
        border: '1px solid rgba(255,255,255,0.05)',
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    cinematicOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        pointerEvents: 'none',
    },
    contentOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 2,
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: '500',
        textShadow: '0 4px 8px rgba(0,0,0,0.6)',
        fontFamily: "'Playfair Display', serif",
        letterSpacing: '0.5px',
        marginBottom: '0.5rem',
        color: '#fff',
        textAlign: 'center',
    },
    line: {
        width: '40px',
        height: '2px',
        backgroundColor: '#d4af37',
        margin: '0.5rem auto 0',
        borderRadius: '2px',
    },
    actions: {
        display: 'flex',
        gap: '0.8rem',
        marginTop: '1.5rem',
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        padding: '8px 12px',
        borderRadius: '30px',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.1)',
    },
    iconBtn: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d4af37',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
    },
    divider: {
        width: '1px',
        height: '16px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        margin: '0 2px',
    }
};

export default Gallery;
