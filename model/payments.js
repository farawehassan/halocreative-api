const Sequelize = require('sequelize');
const sequelize = require('../connection/Database');
const Order = require('../model/order.js');
const Customers = require('../model/customers.js');

const Payment = sequelize.define('payment', {
  paymentId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  orderNumber: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: 'orderNumber'
    },
  },
  customerNumber: {
    type: Sequelize.INTEGER,
    references: {
      model: Customers,
      key: 'customerNumber'
    },
  },
  paymentDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  amount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("success", "failed"),
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

module.exports = Payment;