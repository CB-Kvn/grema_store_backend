import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryUpload = async (images: Express.Multer.File[]) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    try {
        let uploadPromises = images.map(async (image) => {
            const resp = await cloudinary.uploader.upload(image.path,{
                folder: "users-profile"
            })
            return resp.secure_url
        })
        const responseURLs = await Promise.all(uploadPromises);

        return responseURLs
    } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        throw error; // Propagate the error to the caller
    }


}