import multer from 'multer';
import path, { resolve } from 'path';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const filePath = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(filePath, '')
        .toLowerCase()
        .split(' ')
        .join('_') +
      '_' +
      Date.now();
    cb(null, fileName + filePath);
  },
});

export const upload = multer({ storage });

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, rejects) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      (error, result) => {
        fs.unlinkSync(path);
        if (error) {
          rejects(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      },
    );
  });
};
