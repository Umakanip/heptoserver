import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export const User = sequelize.define('Users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'User',
  validate: {
    isIn: [['Admin', 'User']],
  },
}
});
