import productModel from '../model/productModel';
import { uploadImage } from './uploadimgController';

const createProduct = async (req, res) => {
    const { name, price, description, idGroup } = req.body;

    try {
        console.log(req.files);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        // Call the uploadImage function
        const uploadResults = await Promise.all(req.files.map(file => uploadImage(file)));
        const imagePaths = uploadResults.map(result => result.path);
        const hinhanh = imagePaths.join(',');

        const result = await productModel.createProduct(name, price, description, hinhanh, idGroup);

        res.json({ message: 'Product created successfully', productId: result.insertId });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export {
    createProduct,
}