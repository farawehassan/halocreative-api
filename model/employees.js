const Sequelize = require('sequelize');
const sequelize = require('../connection/Database.js');
const Office = require('../model/office.js')

const Employees = sequelize.define('employees', {
  employeeNumber: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  officeCode: {
    type: Sequelize.INTEGER,
    references: {
      model: Office,
      key: 'officeCode'
    },
  }, 
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nameExtension: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jobTitle: {
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
  }
});

module.exports = Employees;