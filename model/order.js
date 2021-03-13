const Sequelize = require('sequelize');
const sequelize = require('../connection/Database');
const Employees = require('../model/employees.js');
const Customers = require('../model/customers.js');
const Services = require('../model/services.js');

const Order = sequelize.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  customerNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Customers,
      key: 'customerNumber'
    },
  },
  serviceCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Services,
      key: 'serviceCode'
    },
  },
  employeeNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Employees,
      key: 'employeeNumber'
    },
  },
  orderDate: {
    type: Sequelize.DATE,
    default: Sequelize.NOW
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("installment", "one-off"),
    allowNull: false,
  },
  amount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amountPaid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type:  Sequelize.DATE,
    default: Sequelize.NOW
  },
  updatedAt: {
    type:  Sequelize.DATE,
    default:Sequelize.NOW
  }
});

module.exports = Order;