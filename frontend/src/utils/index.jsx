import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../config/firebase";

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
};

export const getFormattedValue = (value, type) => {
    if (!type) {
        return value;
    }

    switch (type) {
        case 'date':
            return new Date(value).toLocaleDateString();
        default:
            break;
    }
};

export const handleFileUpload = async (path, file) => {
    if (!file) return null;
    console.log(file);

    const fileRef = ref(storage, `${path}/${file.name}-${Date.now()}`);
    await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
};

export const handleDeleteFile = async (url) => {
    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/campus-pulse-3541a.firebasestorage.app/o/";
    const filePath = decodeURIComponent(url.replace(baseUrl, "").split("?")[0]);
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
};