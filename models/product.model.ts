import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
   image: {
    type: DataTypes.STRING,
    allowNull: true,  // optional field for image filename or URL
  },
});
