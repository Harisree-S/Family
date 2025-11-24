import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Image as ImageIcon } from 'lucide-react';
import { memories } from '../data/memoryData';
import ImageModal from './ImageModal';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const MemoryDetails = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const memory = memories.find(m => m.id === parseInt(id));

    if (!memory) {
        return <div style={{ color: 'white', textAlign: 'center', marginTop: '5rem' }}>Memory not found</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={styles.page}
        >
            <ImageModal
                isOpen={!!selectedImage}
                imageSrc={selectedImage?.url}
                caption={selectedImage?.caption}
                onClose={() => setSelectedImage(null)}
            />
            <div className="container">
                <Link to="/" style={styles.backLink}>
                    <ArrowLeft size={24} /> Back to Gallery
                </Link>

                <div style={styles.header}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={styles.coverImageContainer}
                    >
                        <img src={memory.cover} alt={memory.title} style={styles.coverImage} />
                    </motion.div>
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={styles.info}
                    >
                        <h1 style={styles.title}>{memory.title}</h1>
                        <p style={styles.description}>{memory.description}</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={styles.section}
                >
                    <h2 style={styles.sectionTitle}><ImageIcon style={{ marginRight: '10px' }} /> Photos</h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true }}
                        style={styles.grid}
                    >
                        {memory.photos && memory.photos.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                style={styles.mediaItem}
                                onClick={() => setSelectedImage(item)}
                            >
                                <img
                                    src={item.url}
                                    alt={item.caption}
                                    style={{
                                        ...styles.mediaImage,
                                        objectPosition: item.position || 'center'
                                    }}
                                />
                                <div style={styles.caption}>{item.caption}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={styles.section}
                >
                    <h2 style={styles.sectionTitle}><Play style={{ marginRight: '10px' }} /> Videos</h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true }}
                        style={styles.grid}
                    >
                        {memory.videos && memory.videos.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                style={styles.mediaItem}
                            >
                                <video controls style={styles.mediaImage}>
                                    <source src={item.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div style={styles.caption}>{item.caption}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#050505',
        color: '#fff',
        padding: '2rem 0',
    },
    backLink: {
        display: 'inline-flex',
        alignItems: 'center',
        color: '#d4af37',
        textDecoration: 'none',
        marginBottom: '2rem',
        fontSize: '1.1rem',
        gap: '0.5rem',
    },
    header: {
        textAlign: 'center',
        marginBottom: '4rem',
    },
    coverImageContainer: {
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        borderRadius: '15px',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    },
    coverImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    info: {
        textAlign: 'center',
    },
    title: {
        fontSize: '3rem',
        color: '#d4af37',
        marginBottom: '1rem',
        fontFamily: 'Playfair Display, serif',
    },
    description: {
        fontSize: '1.2rem',
        color: '#ccc',
        maxWidth: '800px',
        margin: '0 auto',
        marginTop: '1rem',
    },
    section: {
        marginBottom: '4rem',
    },
    sectionTitle: {
        fontSize: '2rem',
        borderBottom: '1px solid #333',
        paddingBottom: '1rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
    },
    mediaItem: {
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        cursor: 'pointer',
    },
    mediaImage: {
        width: '100%',
        height: '250px',
        objectFit: 'cover',
        display: 'block',
    },
    caption: {
        padding: '0.8rem',
        textAlign: 'center',
        backgroundColor: '#111',
        color: '#ccc',
        fontSize: '0.9rem',
    }
};

export default MemoryDetails;
