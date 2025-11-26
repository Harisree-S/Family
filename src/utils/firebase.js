import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBts0zc3MIYxfMcYte-HXwhHvYfJEogCc8",
    authDomain: "lalitham-family.firebaseapp.com",
    projectId: "lalitham-family",
    storageBucket: "lalitham-family.firebasestorage.app",
    messagingSenderId: "1068441554366",
    appId: "1:1068441554366:web:b6f442afbdffaf99c67def"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
