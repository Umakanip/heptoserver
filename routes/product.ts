import express from 'express';
import { Product } from '../models/product.model';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Add Product (only admin)
router.post('/addproducts', authenticate(['Admin']), async (req, res) => {
  const { name, price, brand, description } = req.body;
  try {
    const product = await Product.create({ name, price, brand, description });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Get all products (for users)
router.get('/allproducts', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;
