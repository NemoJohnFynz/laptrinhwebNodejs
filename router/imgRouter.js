// router/imageRouter.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage } from '../controller/uploadimgController';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.array('image',10), uploadImage);  

export default router;
