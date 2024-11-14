import express from 'express';
import { createProduct } from '../controller/productController';
import { uploadImage } from '../controller/uploadimgController';

const router = express.Router();

router.post('/createProduct',uploadImage,createProduct)

export default router;