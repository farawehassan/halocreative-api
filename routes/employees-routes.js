const express = require('express');
const employeeController = require('../controllers/employees-controller.js');
const { check, body } = require('express-validator');
const router = express.Router();

// Fetch all available offices from the database
router.get('/fecthAll', employeeController.fetchAllEmployee);

// Find an office from the database
router.get('/fecthOne/:employeeNumber', employeeController.findEmployee);

// Add new office to the database
router.post('/add', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
  ], employeeController.addEmployee
);

// Update an office's details in the database
router.patch('/update/:employeeNumber',  [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
  ], employeeController.update
);

// Delete an office details
router.delete('/delete/:employeeNumber', employeeController.deleteOne);

module.exports = router;