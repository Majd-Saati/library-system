const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./Book');
const User = require('./User');

const Loan = sequelize.define(
  'Loan',
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
    borrowedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    returnedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'loans',
    timestamps: true,
  }
);

Loan.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
Loan.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Book.hasMany(Loan, { foreignKey: 'bookId', as: 'loans' });

module.exports = Loan;
