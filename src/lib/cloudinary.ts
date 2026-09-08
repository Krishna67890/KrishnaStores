import { v2 as cloudinary } from 'cloudinary';

// Cloudinary is typically a server-side library.
// If this file is used in the browser, it will cause issues with Node.js built-ins.
// However, for environment variable compatibility in Vite:

const isBrowser = typeof window !== 'undefined';

cloudinary.config({
  cloud_name: isBrowser ? import.meta.env.VITE_CLOUDINARY_CLOUD_NAME : process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: isBrowser ? import.meta.env.VITE_CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
  api_secret: isBrowser ? import.meta.env.VITE_CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
