import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT as any || 'mssql',
    dialectOptions: {
      options: {
        encrypt: true, // for Azure or secure MSSQL
        trustServerCertificate: true, // add this to avoid SSL errors in local
      },
    },
  }
);

// Optional test connection
sequelize.authenticate()
  .then(() => console.log('✅ DB Connected successfully'))
  .catch((err) => console.error('❌ DB Connection failed:', err));
