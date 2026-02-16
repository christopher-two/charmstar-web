import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File) => {
    const options = {
        maxSizeMB: 0.8, // Max size in MB
        maxWidthOrHeight: 1280, // Max width or height
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
        return compressedFile;
    } catch (error) {
        console.error('Image compression failed:', error);
        return file; // Return original on failure
    }
};
