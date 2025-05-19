import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authroutes';
import productRoutes from './routes/productroutes';
import { sequelize } from './utils/db';
import path from 'path';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('__dirname:', __dirname);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.log('DB sync failed:', err));
