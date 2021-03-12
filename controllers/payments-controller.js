const Payments = require('../model/payments');
const { validationResult } = require('express-validator');

// Add new payment 
exports.addPayment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }
  Payments.create({
    orderNumber: req.body.orderNumber,
    customerNumber: req.body.customerNumber,
    paymentDate: req.body.paymentDate,
    amount: req.body.amount,
    status: req.body.status  
  })
    .then(result => {
      console.log(result);
      return res.status(200).send({ error: false, message: "Sucessfully created payment", data: result });
    })
    .catch(err => {
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Fetch all available Paymnents
exports.fetchAllPayments = (req, res, next) => {  
    Payments.findAll()
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully fetched all payments", data: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
  });
}

// Fetch a payment
exports.findPayment = (req, res, next) => {
    Payments.findByPk(req.params.paymentId)
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully found payment", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Update a payment 
exports.update = async (req, res, next) => {
    Payments.findByPk(req.params.paymentId)
    .then(payment => {
        payment.paymentDate = req.body.paymentDate,
        payment.amount = req.body.amount,
        payment.status = req.body.status
      return payment.save();
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully updated payment", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
};

// Delete a customer
exports.deleteOne = async (req, res, next) => {
    Payments.findByPk(req.params.paymentId)
    .then(payment => { 
      return payment.destroy(); 
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully deleted customer"});
    })
    .catch(err => {
      console.log(err);
      return res.status(404).send({ error: true, message: 'Payment not found' });
    });
}