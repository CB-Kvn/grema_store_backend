"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinaryUpload = async (images) => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        let uploadPromises = images.map(async (image) => {
            const resp = await cloudinary_1.v2.uploader.upload(image.path, {
                folder: "users-profile"
            });
            return resp.secure_url;
        });
        const responseURLs = await Promise.all(uploadPromises);
        return responseURLs;
    }
    catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        throw error; // Propagate the error to the caller
    }
};
exports.cloudinaryUpload = cloudinaryUpload;
//# sourceMappingURL=upload_handler.js.map