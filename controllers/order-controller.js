const Order = require('../model/order');
const { validationResult } = require('express-validator');

// Add new order 
exports.addOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }
  Order.create({
    customerNumber: req.body.customerNumber,
    serviceCode: req.body.serviceCode,
    employeeNumber: req.body.employeeNumber,
    quantity: req.body.quantity,
    status: req.body.status,
    amount: req.body.amount,
    amountPaid: req.body.amountPaid,
  })
    .then(result => {
      console.log(result);
      return res.status(200).send({ error: false, message: "Sucessfully created order", data: result });
    })
    .catch(err => {
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Fetch all orders
exports.fetchAllOrder = (req, res, next) => {  
    Order.findAll()
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully fetched all orders", data: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
  });
}

// Fetch an order
exports.findOrder = (req, res, next) => {
    Order.findByPk(req.params.orderNumber)
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully found order", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Update an order
exports.update = async (req, res, next) => {
    Order.findByPk(req.params.orderNumber)
    .then(order => {
        order.quantity = req.body.quantity,
        order.status = req.body.status,
        order.amount = req.body.amount,
        order.amountPaid = req.body.amountPaid
        return order.save();
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully updated order", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
};

// Delete an order
exports.deleteOne = async (req, res, next) => {
    Order.findByPk(req.params.orderNumber)
    .then(order => { 
      return order.destroy(); 
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully deleted order"});
    })
    .catch(err => {
      console.log(err);
      return res.status(404).send({ error: true, message: 'Order not found' });
    });
}