import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SQUser = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false
  },

  sex: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }

}, {
  tableName: 'Squsers', 
  timestamps: false, 
});

export default SQUser;
