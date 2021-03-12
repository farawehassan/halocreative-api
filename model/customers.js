const Sequelize = require('sequelize');
const sequelize = require('../connection/Database');

const Customers = sequelize.define('customers', {
  customerNumber: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  customerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addressLine2: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type:  Sequelize.DATE,
    default: Sequelize.NOW
  },
  updatedAt: {
    type:  Sequelize.DATE,
    default: Sequelize.NOW
  },
});

module.exports = Customers;