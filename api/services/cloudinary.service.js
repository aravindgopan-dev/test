const cloudinary = require("cloudinary");

// Set up Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Function to upload image from URL and return Cloudinary URL
const uploadImageFromUrl = async (imageUrl) => {
  try {
    if (!imageUrl) {
      throw new Error("Image URL is required");
    }

    const result = await cloudinary.uploader.upload(imageUrl);
    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = uploadImageFromUrl;
