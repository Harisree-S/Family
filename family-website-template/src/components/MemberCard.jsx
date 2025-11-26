import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCoverOverride } from '../utils/mediaStore';
import clickAudio from '../assets/audio/click.mp3';
import { useAudio } from './AudioController';

const MemberCard = ({ member }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [coverOverride, setCoverOverride] = useState(null);
    const { playSfx } = useAudio();

    useEffect(() => {
        // Fetch cover override
        getCoverOverride(member.id, 'member').then(cover => {
            if (cover) setCoverOverride(cover);
        });
    }, [member.id]);

    // Determine display image and style
    const displayImage = coverOverride ? coverOverride.url : member.photo;
    const displayStyle = coverOverride ? {
        objectPosition: coverOverride.position,
        transform: `scale(${coverOverride.scale})`
    } : {
        objectPosition: member.imagePosition || 'center',
        transform: 'scale(1)'
    };

    return (
        <Link
            to={`/member/${member.id}`}
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
                const isTouch = window.matchMedia("(pointer: coarse)").matches;
                if (isTouch && !isHovered) {
                    e.preventDefault();
                    setIsHovered(true);
                } else {
                    playSfx(clickAudio);
                }
            }}
        >
            <motion.div
                style={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={isHovered ? { y: -10, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)' } : { y: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                onHoverStart={() => !window.matchMedia("(pointer: coarse)").matches && setIsHovered(true)}
                onHoverEnd={() => !window.matchMedia("(pointer: coarse)").matches && setIsHovered(false)}
            >
                <div style={styles.imageContainer}>
                    <img
                        src={displayImage}
                        alt={member.name}
                        style={{
                            ...styles.image,
                            ...displayStyle
                        }}
                    />
                    <div style={styles.overlay} />
                </div>
                <div style={styles.info}>
                    <h2 style={styles.name}>{member.name}</h2>
                </div>
            </motion.div>
        </Link>
    );
};

const styles = {
    card: {
        position: 'relative',
        borderRadius: '15px',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s ease',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        paddingTop: '120%', // Aspect ratio
        overflow: 'hidden',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '50%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        pointerEvents: 'none',
    },
    info: {
        padding: '1.5rem',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 2,
    },
    name: {
        fontSize: '1.5rem',
        color: '#d4af37',
        fontFamily: 'Playfair Display, serif',
        margin: 0,
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    }
};

export default MemberCard;
