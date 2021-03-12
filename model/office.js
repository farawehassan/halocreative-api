const Sequelize = require('sequelize');
const sequelize = require('../connection/Database');

const Office = sequelize.define('office', {
  officeCode: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  city: Sequelize.STRING,
  phone: Sequelize.STRING,
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addressLine2: Sequelize.STRING,
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
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

module.exports = Office;