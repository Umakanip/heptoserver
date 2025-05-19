import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where images will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage });

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, brand } = req.body;
     const image = req.file ? req.file.filename : null;

    const newProduct = await Product.create({ name, price, brand,image });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll();
  console.log(JSON.stringify(products));
  res.json(products);
};
