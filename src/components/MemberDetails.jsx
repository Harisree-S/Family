import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Image as ImageIcon } from 'lucide-react';
import { familyMembers } from '../data/familyData';
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

const MemberDetails = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const member = familyMembers.find(m => m.id === parseInt(id));

    if (!member) {
        return <div style={{ color: 'white', textAlign: 'center', marginTop: '5rem' }}>Member not found</div>;
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
                    <ArrowLeft size={24} /> Back to Family
                </Link>

                <div style={styles.header}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={styles.profileImageContainer}
                    >
                        <img
                            src={member.photo}
                            alt={member.name}
                            style={{
                                ...styles.profileImage,
                                objectPosition: member.imagePosition || 'center'
                            }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={styles.info}
                    >
                        <h1 style={styles.name}>{member.name}</h1>
                        <h3 style={styles.relation}>{member.relation}</h3>
                        <p style={styles.bio}>{member.bio}</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
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
                        {member.photos && member.photos.map((item, index) => (
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
                                        objectPosition: item.position || 'center',
                                        transform: item.scale ? `scale(${item.scale})` : 'scale(1)'
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
                    transition={{ delay: 0.5 }}
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
                        {member.videos && member.videos.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                style={styles.mediaItem}
                            >
                                <video
                                    controls
                                    poster={item.thumbnail}
                                    style={{
                                        ...styles.mediaImage,
                                        objectFit: 'contain',
                                        backgroundColor: '#000'
                                    }}
                                >
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
        backgroundColor: '#0a0a0a',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '4rem',
        textAlign: 'center',
    },
    profileImageContainer: {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '4px solid #d4af37',
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    info: {
        maxWidth: '600px',
    },
    name: {
        fontSize: '3rem',
        fontFamily: 'Playfair Display, serif',
        color: '#d4af37',
        marginBottom: '0.5rem',
    },
    relation: {
        fontSize: '1.5rem',
        color: '#888',
        marginBottom: '1.5rem',
    },
    bio: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#ccc',
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
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
        height: '200px',
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

export default MemberDetails;
