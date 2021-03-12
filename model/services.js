const Sequelize = require('sequelize');
const sequelize = require('../connection/Database');

const Services = sequelize.define('services', {
  serviceCode: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  serviceName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  serviceDescription: {
    type: Sequelize.STRING,
    allowNull: true,
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

module.exports = Services;