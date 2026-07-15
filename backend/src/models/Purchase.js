const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./Book');
const User = require('./User');

const Purchase = sequelize.define(
  'Purchase',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    purchasedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'purchases',
    timestamps: true,
  }
);

Purchase.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
Purchase.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Purchase;
