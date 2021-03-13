const express = require('express');
const paymentController = require('../controllers/payments-controller.js');
const { check, body } = require('express-validator');
const router = express.Router();

// Fetch all payment from the database
router.get('/fecthAll', paymentController.fetchAllPayments);

// Find a payment from the database
router.get('/fecthOne/:paymentId', paymentController.findPayment);

// Add new payment to the database
router.post('/add', [
  body('status')
    .custom((value, { req }) => {
      if (!(value === "success" || value === "failed")) {
        throw new Error('Payment status can only be success or failed');
      }
      return true;
    }),
  ], paymentController.addPayment
);

// Update a payment's details in the database
router.patch('/update/:paymentId', [
  body('status')
    .custom((value, { req }) => {
      if (!(value === "success" || value === "failed")) {
        throw new Error('Payment status can only be success or failed');
      }
      return true;
    }),
  ], paymentController.update
);

// Delete a payment details
router.delete('/delete/:paymentId', paymentController.deleteOne);

module.exports = router;