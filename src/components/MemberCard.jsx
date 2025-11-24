import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Instagram, Calendar, Heart } from 'lucide-react';

const MemberCard = ({ member, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={`/member/${member.id}`} style={{ textDecoration: 'none' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={styles.cardWrapper}
            >
                <motion.div
                    style={styles.card}
                    whileHover={{
                        y: -10,
                        scale: 1.02,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                        rotateX: 5,
                        rotateY: 5
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div style={styles.imageContainer}>
                        <motion.img
                            src={member.photo}
                            alt={member.name}
                            style={{ ...styles.image, objectPosition: member.imagePosition || 'top' }}
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <div style={styles.info}>
                        <h3 style={styles.name}>{member.name}</h3>

                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                            style={styles.details}
                        >
                            <p style={styles.bio}>{member.bio}</p>
                            <div style={styles.dates}>
                                <div style={styles.dateItem}>
                                    <Calendar size={16} color="#d4af37" />
                                    <span>{member.birthday}</span>
                                </div>
                                {member.anniversary && (
                                    <div style={styles.dateItem}>
                                        <Heart size={16} color="#800000" />
                                        <span>{member.anniversary}</span>
                                    </div>
                                )}
                            </div>
                            <div style={styles.actions}>
                                {member.phone && (
                                    <a href={`tel:${member.phone}`} style={styles.iconBtn} onClick={(e) => e.stopPropagation()}>
                                        <Phone size={20} />
                                    </a>
                                )}
                                {member.instagram && (
                                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" style={styles.iconBtn} onClick={(e) => e.stopPropagation()}>
                                        <Instagram size={20} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    );
};

const styles = {
    cardWrapper: {
        perspective: '1000px',
    },
    card: {
        backgroundColor: '#111', // Dark card
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        border: '1px solid #333',
        transformStyle: 'preserve-3d',
    },
    imageContainer: {
        width: '100%',
        height: '250px', // Medium sized image
        overflow: 'hidden',
        filter: 'grayscale(10%)', // Reduced grayscale for better look
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',

    },
    info: {
        padding: '1.5rem',
        textAlign: 'center',
        background: 'linear-gradient(to top, #111 0%, #1a1a1a 100%)',
    },
    name: {
        fontSize: '1.8rem',
        marginBottom: '0.5rem',
        color: '#fff',
        fontFamily: 'Playfair Display, serif',
    },
    details: {
        overflow: 'hidden',
    },
    bio: {
        fontSize: '0.95rem',
        color: '#ccc',
        marginBottom: '1rem',
        fontStyle: 'italic',
        lineHeight: '1.4',
    },
    dates: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        fontSize: '0.85rem',
        color: '#888',
    },
    dateItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
    },
    iconBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d4af37',
        transition: 'all 0.3s',
        border: '1px solid #444',
    },
};

export default MemberCard;
