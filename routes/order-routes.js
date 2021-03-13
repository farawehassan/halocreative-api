const express = require('express');
const orderController = require('../controllers/order-controller.js');
const { check, body } = require('express-validator');
const router = express.Router();

// Fetch all available offices from the database
router.get('/fecthAll', orderController.fetchAllOrder);

// Find an office from the database
router.get('/fecthOne/:orderNumber', orderController.findOrder);

// Add new office to the database
router.post('/add', [
  body('status')
    .custom((value, { req }) => {
      if (!(value === "installment" || value === "one-off")) {
        throw new Error('Order status can only be installment or one-off');
      }
      return true;
    }),
  ], orderController.addOrder
);

// Update an office's details in the database
router.patch('/update/:orderNumber', [
  body('status')
    .custom((value, { req }) => {
      if (!(value === "installment" || value === "one-off")) {
        throw new Error('Order status can only be installment or one-off');
      }
      return true;
    }),
  ], orderController.update
);

// Delete an office details
router.delete('/delete/:orderNumber', orderController.deleteOne);

module.exports = router;