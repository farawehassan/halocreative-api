const express = require('express');
const paymentController = require('../controllers/payments-controller.js');
const { check, body } = require('express-validator');
const router = express.Router();

// Fetch all payment from the database
router.get('/fecthAll', paymentController.fetchAllPayments);

// Find a payment from the database
router.get('/fecthOne/:paymentId', paymentController.findPayment);
                                                                        
// Add new payment to the database
router.post('/add', paymentController.addPayment);

// Update a payment's details in the database
router.put('/update/:paymentId', paymentController.update);

// Delete a payment details
router.delete('/delete/:paymentId', paymentController.deleteOne);

module.exports = router;