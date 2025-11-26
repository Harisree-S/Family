import { db } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc,
    setDoc,
    getDoc
} from 'firebase/firestore';

const UPLOADS_COLLECTION = 'uploads';
const COVERS_COLLECTION = 'covers';
const CLOUDINARY_CLOUD_NAME = 'dpfxu4gkw';
const CLOUDINARY_UPLOAD_PRESET = 'ls_family';

// Helper to upload to Cloudinary
const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('resource_type', 'auto'); // Auto-detect image or video

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Cloudinary upload failed');
    }

    const data = await response.json();
    return {
        url: data.secure_url,
        storagePath: data.public_id // We store public_id as storagePath
    };
};

// --- Media Management (Photos/Videos) ---

export const saveMedia = async (parentId, category, type, file, caption = '', scale = 1, position = 'center') => {
    try {
        // 1. Upload file to Cloudinary
        const { url, storagePath } = await uploadToCloudinary(file);

        // 2. Save metadata to Firestore
        const mediaItem = {
            parentId: parseInt(parentId),
            category, // 'member' or 'memory'
            type,
            url: url,
            storagePath: storagePath,
            caption: caption || `Uploaded ${type}`,
            scale,
            position,
            timestamp: Date.now()
        };

        const docRef = await addDoc(collection(db, UPLOADS_COLLECTION), mediaItem);
        return { ...mediaItem, id: docRef.id };

    } catch (error) {
        console.error("Error saving media:", error);
        throw error;
    }
};

export const getMedia = async (parentId, category) => {
    try {
        const q = query(
            collection(db, UPLOADS_COLLECTION),
            where("parentId", "==", parseInt(parentId)),
            where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching media:", error);
        return [];
    }
};

export const deleteMedia = async (id) => {
    try {
        // 1. Get document
        const docRef = doc(db, UPLOADS_COLLECTION, id);

        // 2. Delete from Firestore (We leave the file in Cloudinary for now as it requires signed API to delete)
        await deleteDoc(docRef);

    } catch (error) {
        console.error("Error deleting media:", error);
        throw error;
    }
};

export const updateMedia = async (id, updates) => {
    try {
        const docRef = doc(db, UPLOADS_COLLECTION, id);
        await updateDoc(docRef, updates);
        return { id, ...updates };
    } catch (error) {
        console.error("Error updating media:", error);
        throw error;
    }
};

// --- Cover Overrides ---

export const saveCoverOverride = async (parentId, type, file, scale = 1, position = 'center') => {
    try {
        // 1. Upload to Cloudinary
        const { url, storagePath } = await uploadToCloudinary(file);

        // 2. Save/Update in Firestore
        const id = `${type}-${parentId}`;
        const coverItem = {
            url: url,
            storagePath: storagePath,
            scale,
            position,
            timestamp: Date.now()
        };

        await setDoc(doc(db, COVERS_COLLECTION, id), coverItem);
        return coverItem;

    } catch (error) {
        console.error("Error saving cover:", error);
        throw error;
    }
};

export const getCoverOverride = async (parentId, type) => {
    try {
        const id = `${type}-${parentId}`;
        const docRef = doc(db, COVERS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error("Error fetching cover:", error);
        return null;
    }
};

// --- Static Media Management (Keep LocalStorage for now as it's user-specific preference) ---
// Or we could move this to Firestore too, but let's keep it simple for now.

const STATIC_HIDDEN_KEY = 'lalitham_hidden_static_media';

export const hideStaticMedia = (url) => {
    const hidden = JSON.parse(localStorage.getItem(STATIC_HIDDEN_KEY) || '[]');
    if (!hidden.includes(url)) {
        hidden.push(url);
        localStorage.setItem(STATIC_HIDDEN_KEY, JSON.stringify(hidden));
    }
};

export const getHiddenStaticMedia = () => {
    return JSON.parse(localStorage.getItem(STATIC_HIDDEN_KEY) || '[]');
};

// Static Caption Overrides (LocalStorage)
const STATIC_CAPTIONS_KEY = 'lalitham_static_captions';

export const updateStaticCaption = (url, newCaption) => {
    const captions = JSON.parse(localStorage.getItem(STATIC_CAPTIONS_KEY) || '{}');
    captions[url] = newCaption;
    localStorage.setItem(STATIC_CAPTIONS_KEY, JSON.stringify(captions));
};

export const getStaticCaptionOverrides = () => {
    return JSON.parse(localStorage.getItem(STATIC_CAPTIONS_KEY) || '{}');
};
