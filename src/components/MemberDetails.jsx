import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Image as ImageIcon } from 'lucide-react';
import { familyMembers } from '../data/familyData';
import ImageModal from './ImageModal';
import PageTransition from './PageTransition';
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

const MemberDetails = () => {
    const { id } = useParams();
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [hiddenMedia, setHiddenMedia] = useState([]);
    const [captionOverrides, setCaptionOverrides] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const [profileStyle, setProfileStyle] = useState({});

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

    const member = familyMembers.find(m => m.id === parseInt(id));
    const { playImageAudio, playSfx, clearImageAudio, setOverrideBgTrack, setIsVideoPlaying } = useAudio();

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [uploadFileType, setUploadFileType] = useState('image');
    const [uploadFile, setUploadFile] = useState(null);
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

    const fetchMedia = () => {
        if (member) {
            console.log('Fetching media for member:', member.id);
            getMedia(member.id, 'member').then(media => {
                console.log('Fetched media:', media);
                const photos = media.filter(m => m.type === 'image');
                const videos = media.filter(m => m.type === 'video');
                console.log('Filtered photos:', photos);
                console.log('Filtered videos:', videos);
                setUploadedPhotos(photos);
                setUploadedVideos(videos);
            }).catch(error => console.error('Error fetching media:', error));
        }
        setHiddenMedia(getHiddenStaticMedia());
        setCaptionOverrides(getStaticCaptionOverrides());

        // Fetch cover override
        if (member) {
            getCoverOverride(member.id, 'member').then(cover => {
                if (cover) {
                    setProfileImage(cover.url);
                    setProfileStyle({
                        objectPosition: cover.position,
                        transform: `scale(${cover.scale})`
                    });
                } else {
                    setProfileImage(member.photo);
                    setProfileStyle({
                        objectPosition: member.imagePosition || '50% 20%' // Smart default
                    });
                }
            });
        }
    };

    useEffect(() => {
        fetchMedia();
    }, [member]);

    useEffect(() => {
        if (member && member.entryAudio) {
            playImageAudio(member.entryAudio, member.audioVolume || 0.5, true);
        }
        return () => {
            clearImageAudio();
        };
    }, [member, playImageAudio, clearImageAudio]);

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
            console.log('File selected:', file);
            setUploadFile(file);
            setIsUploadModalOpen(true);
        }
        e.target.value = '';
    };

    const handleUploadSave = async ({ caption, scale, position }) => {
        console.log('handleUploadSave called with:', { caption, scale, position, uploadFile, uploadFileType });

        if (uploadFileType === 'video') {
            setIsUploadingVideo(true);
        } else {
            setIsUploadingPhoto(true);
        }

        const loadingToast = showToast('Uploading media... please wait', 'loading');

        try {
            if (uploadFileType === 'cover') {
                const newCover = await saveCoverOverride(member.id, 'member', uploadFile, scale, position);
                setProfileImage(newCover.url);
                setProfileStyle({
                    objectPosition: newCover.position,
                    transform: `scale(${newCover.scale})`
                });
                showToast('Profile photo updated!', 'success');
            } else {
                await saveMedia(member.id, 'member', uploadFileType, uploadFile, caption, scale, position);
                showToast('Uploaded successfully!', 'success');
                console.log('Upload successful, refreshing media...');
                fetchMedia(); // Refresh list
            }
        } catch (error) {
            console.error('Upload failed:', error);
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

    if (!member) {
        return <div style={{ color: 'white', textAlign: 'center', marginTop: '5rem' }}>Member not found</div>;
    }

    const processMedia = (items) => {
        return items
            .filter(item => !hiddenMedia.includes(item.url))
            .map(item => ({
                ...item,
                caption: captionOverrides[item.url] || item.caption
            }));
    };

    const allPhotos = [...processMedia(member.photos || []), ...uploadedPhotos];
    const allVideos = [...processMedia(member.videos || []), ...uploadedVideos];

    return (
        <PageTransition>
            <div style={styles.page}>
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
                                src={profileImage || member.photo}
                                alt={member.name}
                                style={{
                                    ...styles.profileImage,
                                    ...profileStyle
                                }}
                            />
                            <button
                                onClick={() => handleUploadClick('cover')}
                                style={styles.editCoverBtn}
                                title="Change Profile Photo"
                            >
                                <ImageIcon size={14} />
                            </button>
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
            </div>
        </PageTransition>
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
        width: 'clamp(150px, 30vw, 200px)',
        height: 'clamp(150px, 30vw, 200px)',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '4px solid #d4af37',
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
        position: 'relative',
    },
    editCoverBtn: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '30px',
        height: '30px',
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
    profileImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'contrast(1.05) saturate(1.1)', // Cinematic look
    },
    info: {
        maxWidth: '600px',
    },
    name: {
        fontSize: 'clamp(2rem, 5vw, 3rem)',
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
        color: '#d4af37',
        display: 'flex',
        alignItems: 'center',
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

export default MemberDetails;
