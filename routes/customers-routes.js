const express = require('express');
const customerController = require('../controllers/customers-controller.js');
const { check, body } = require('express-validator');
const router = express.Router();

// Fetch all available customers from the database
router.get('/fecthAll', customerController.fetchAllCustomers);

// Find a customer from the database
router.get('/fecthOne/:customerNumber', customerController.findCustomer);
                                                                        
// Add new customer to the database
router.post('/add', customerController.addCustomer);

// Update a customer's details in the database
router.put('/update/:customerNumber', customerController.update);

// Delete a customer details
router.delete('/delete/:customerNumber', customerController.deleteOne);

module.exports = router;