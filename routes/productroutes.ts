import express from 'express';
import { addProduct, getProducts, upload } from '../controllers/productController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Routes protected by JWT middleware
router.post(
  '/addproduct',
  authenticate(['Admin']),  
  upload.single('image'),   
  addProduct                
);
router.get('/allproduct', getProducts);

export default router;
