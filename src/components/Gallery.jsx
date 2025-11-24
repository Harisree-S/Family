import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memories } from '../data/memoryData';

const Gallery = () => {
    return (
        <section style={styles.section}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Memories
                </motion.h2>
                <div style={styles.grid}>
                    {memories.map((memory, index) => (
                        <Link to={`/memory/${memory.id}`} key={memory.id} style={{ textDecoration: 'none' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                style={styles.item}
                            >
                                <img src={memory.cover} alt={memory.title} style={styles.image} />
                                <div style={styles.overlay}>
                                    <h3 style={styles.title}>{memory.title}</h3>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '5rem 0',
        backgroundColor: '#050505', // Very dark bg
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    item: {
        borderRadius: '4px', // Sharper corners
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        filter: 'grayscale(50%)', // Artistic
        transition: 'filter 0.3s',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        padding: '1rem',
        color: 'white',
        textAlign: 'center',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    }
};

export default Gallery;
