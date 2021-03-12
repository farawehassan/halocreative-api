const Customers = require('../model/customers');
const { validationResult } = require('express-validator');

// Add new customer 
exports.addCustomer = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }
  Customers.create({
    customerName: req.body.customerName,
    phone: req.body.phone,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    country: req.body.country  
  })
    .then(result => {
      console.log(result);
      return res.status(200).send({ error: false, message: "Sucessfully created customer", data: result });
    })
    .catch(err => {
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Fetch all available customers
exports.fetchAllCustomers = (req, res, next) => {  
    Customers.findAll()
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully fetched all customers", data: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
  });
}

// Fetch a customer
exports.findCustomer = (req, res, next) => {
    Customers.findByPk(req.params.customerNumber)
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully found customer", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Update a customer 
exports.update = async (req, res, next) => {
    Customers.findByPk(req.params.customerNumber)
    .then(customer => {
        customer.customerName = req.body.customerName,
        customer.phone = req.body.phone,
        customer.addressLine1 = req.body.addressLine1,
        customer.addressLine2 = req.body.addressLine2,
        customer.city = req.body.city,
        customer.country = req.body.country  
      return customer.save();
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully updated customer", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
};

// Delete a customer
exports.deleteOne = async (req, res, next) => {
    Customers.findByPk(req.params.customerNumber)
    .then(customer => { 
      return customer.destroy(); 
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully deleted customer"});
    })
    .catch(err => {
      console.log(err);
      return res.status(404).send({ error: true, message: 'Emoloyee not found' });
    });
}