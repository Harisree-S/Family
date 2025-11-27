import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Image as ImageIcon } from 'lucide-react';
import { memories } from '../data/memoryData';
import ImageModal from './ImageModal';
import UploadModal from './UploadModal';
import CaptionModal from './CaptionModal';
import ConfirmModal from './ConfirmModal';
import MediaItem from './MediaItem';
import { useAudio } from './AudioController';
import { showToast } from './Toast';
import {
    getMedia,
    saveMedia,
    deleteMedia,
    updateMedia,
    hideStaticMedia,
    getHiddenStaticMedia,
    updateStaticCaption,
    getStaticCaptionOverrides,
    saveCoverOverride,
    getCoverOverride
} from '../utils/mediaStore';

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
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [hiddenMedia, setHiddenMedia] = useState([]);
    const [captionOverrides, setCaptionOverrides] = useState({});
    const [coverImage, setCoverImage] = useState(null);
    const [coverStyle, setCoverStyle] = useState({});

    // Modal State
    const [isCaptionModalOpen, setIsCaptionModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        isDangerous: false
    });

    const memory = memories.find(m => m.id === parseInt(id));
    const { playImageAudio, playSfx, clearImageAudio, setOverrideBgTrack, setIsVideoPlaying } = useAudio();

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [uploadFileType, setUploadFileType] = useState('image');
    const [uploadFile, setUploadFile] = useState(null);
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

    const fetchMedia = () => {
        if (memory) {
            getMedia(memory.id, 'memory').then(media => {
                const photos = media.filter(m => m.type === 'image');
                const videos = media.filter(m => m.type === 'video');
                setUploadedPhotos(photos);
                setUploadedVideos(videos);
            }).catch(console.error);
        }
        setHiddenMedia(getHiddenStaticMedia());
        setCaptionOverrides(getStaticCaptionOverrides());

        // Fetch cover override
        if (memory) {
            getCoverOverride(memory.id, 'memory').then(cover => {
                if (cover) {
                    setCoverImage(cover.url);
                    setCoverStyle({
                        objectPosition: cover.position,
                        transform: `scale(${cover.scale})`
                    });
                } else {
                    setCoverImage(memory.cover);
                    setCoverStyle({
                        objectPosition: memory.coverPosition || 'center'
                    });
                }
            });
        }
    };

    useEffect(() => {
        fetchMedia();
    }, [memory]);

    useEffect(() => {
        if (memory && memory.entryAudio) {
            playImageAudio(memory.entryAudio, memory.audioVolume || 0.5, true);
        }
        return () => {
            clearImageAudio();
        };
    }, [memory, playImageAudio, clearImageAudio]);

    const handleUploadClick = (type) => {
        setUploadFileType(type);
        if (type === 'video') {
            videoInputRef.current.click();
        } else {
            imageInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
            setIsUploadModalOpen(true);
        }
        e.target.value = '';
    };

    const handleUploadSave = async ({ caption, scale, position }) => {
        if (uploadFileType === 'video') {
            setIsUploadingVideo(true);
        } else {
            setIsUploadingPhoto(true);
        }
        showToast('Uploading media... please wait', 'loading');
        try {
            if (uploadFileType === 'cover') {
                const newCover = await saveCoverOverride(memory.id, 'memory', uploadFile, scale, position);
                setCoverImage(newCover.url);
                setCoverStyle({
                    objectPosition: newCover.position,
                    transform: `scale(${newCover.scale})`
                });
                showToast('Cover updated successfully!', 'success');
            } else {
                await saveMedia(memory.id, 'memory', uploadFileType, uploadFile, caption, scale, position);
                showToast('Uploaded successfully!', 'success');
                fetchMedia(); // Refresh list
            }
        } catch (error) {
            console.error(error);
            showToast(`Upload failed: ${error.message}`, 'error');
        } finally {
            setIsUploadingPhoto(false);
            setIsUploadingVideo(false);
        }
    };

    const handleMediaClick = (item, type) => {
        setSelectedMedia({ ...item, type });
        if (item.audio) {
            playSfx(item.audio);
        }
        if (type === 'video') {
            setIsVideoPlaying(true);
        }
    };

    const handleCloseModal = () => {
        setSelectedMedia(null);
        setIsVideoPlaying(false);
    };

    const handleDelete = (e, item) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Item',
            message: 'Are you sure you want to delete this item? This action cannot be undone.',
            isDangerous: true,
            onConfirm: async () => {
                try {
                    if (item.id) {
                        await deleteMedia(item.id);
                    } else {
                        hideStaticMedia(item.url);
                    }
                    fetchMedia();
                    showToast('Item deleted successfully', 'success');
                } catch (error) {
                    console.error('Delete failed:', error);
                    showToast('Failed to delete item', 'error');
                }
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleEditClick = (e, item) => {
        setEditingItem(item);
        setIsCaptionModalOpen(true);
    };

    const handleSaveCaption = async (newCaption) => {
        if (!editingItem) return;

        try {
            if (editingItem.id) {
                await updateMedia(editingItem.id, { caption: newCaption });
            } else {
                updateStaticCaption(editingItem.url, newCaption);
            }
            fetchMedia();
            showToast('Caption updated successfully', 'success');
        } catch (error) {
            console.error('Update failed:', error);
            showToast('Failed to update caption', 'error');
        }
    };

    if (!memory) {
        return <div style={{ color: 'white', textAlign: 'center', marginTop: '5rem' }}>Memory not found</div>;
    }

    const processMedia = (items) => {
        return items
            .filter(item => !hiddenMedia.includes(item.url))
            .map(item => ({
                ...item,
                caption: captionOverrides[item.url] || item.caption
            }));
    };

    const allPhotos = [...uploadedPhotos, ...processMedia(memory.photos || [])];
    const allVideos = [...uploadedVideos, ...processMedia(memory.videos || [])];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={styles.page}
        >
            <ImageModal
                isOpen={!!selectedMedia}
                mediaSrc={selectedMedia?.url}
                type={selectedMedia?.type}
                caption={selectedMedia?.caption}
                onClose={handleCloseModal}
            />

            <CaptionModal
                isOpen={isCaptionModalOpen}
                onClose={() => setIsCaptionModalOpen(false)}
                onSave={handleSaveCaption}
                initialCaption={editingItem?.caption}
                title="Edit Caption"
            />

            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSave={handleUploadSave}
                file={uploadFile}
                type={uploadFileType}
                aspectRatio={1}
            />

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                isDangerous={confirmModal.isDangerous}
                confirmText="Delete"
            />

            <input
                type="file"
                ref={imageInputRef}
                style={{ display: 'none' }}
                accept="image/*,.jpg,.jpeg,.png,.gif,.webp,.svg"
                onChange={handleFileChange}
            />
            <input
                type="file"
                ref={videoInputRef}
                style={{ display: 'none' }}
                accept="video/*,.mp4,.mov,.webm,.ogg,.avi,.mkv,.wmv"
                onChange={handleFileChange}
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
                        <img
                            src={coverImage || memory.cover}
                            alt={memory.title}
                            style={{
                                ...styles.coverImage,
                                ...coverStyle
                            }}
                        />
                        <button
                            onClick={() => handleUploadClick('cover')}
                            style={styles.editCoverBtn}
                            title="Change Cover Photo"
                        >
                            <ImageIcon size={16} />
                        </button>
                    </motion.div>
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={styles.info}
                    >
                        <h1 style={styles.title}>{memory.title}</h1>
                        <p style={styles.description}>{memory.description}</p>

                        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => handleUploadClick('image')}
                                style={{ ...styles.uploadBtn, opacity: isUploadingPhoto ? 0.5 : 1, cursor: isUploadingPhoto ? 'not-allowed' : 'pointer' }}
                                disabled={isUploadingPhoto || isUploadingVideo}
                            >
                                <ImageIcon size={18} /> {isUploadingPhoto ? 'Uploading...' : 'Add Photo'}
                            </button>
                            <button
                                onClick={() => handleUploadClick('video')}
                                style={{ ...styles.uploadBtn, opacity: isUploadingVideo ? 0.5 : 1, cursor: isUploadingVideo ? 'not-allowed' : 'pointer' }}
                                disabled={isUploadingPhoto || isUploadingVideo}
                            >
                                <Play size={18} /> {isUploadingVideo ? 'Uploading...' : 'Add Video'}
                            </button>
                        </div>
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
                        {allPhotos.length > 0 ? allPhotos.map((item, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <MediaItem
                                    item={item}
                                    type="image"
                                    onClick={(item) => handleMediaClick(item, 'image')}
                                    onEdit={handleEditClick}
                                    onDelete={handleDelete}
                                />
                            </motion.div>
                        )) : (
                            <p style={{ color: '#666', fontStyle: 'italic' }}>No photos yet.</p>
                        )}
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
                        {allVideos.length > 0 ? allVideos.map((item, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <MediaItem
                                    item={item}
                                    type="video"
                                    onClick={(item) => handleMediaClick(item, 'video')}
                                    onEdit={handleEditClick}
                                    onDelete={handleDelete}
                                />
                            </motion.div>
                        )) : (
                            <p style={{ color: '#666', fontStyle: 'italic' }}>No videos yet.</p>
                        )}
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
        position: 'relative',
    },
    editCoverBtn: {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        border: '1px solid #d4af37',
        color: '#d4af37',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '2rem',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        border: '1px solid #d4af37',
        borderRadius: '20px',
        color: '#d4af37',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
    }
};

export default MemoryDetails;
