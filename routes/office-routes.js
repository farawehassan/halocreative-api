const express = require('express');
const officeController = require('../controllers/office-controller.js');
const { check, body } = require('express-validator');
const router = express.Router();

// Fetch all available offices from the database
router.get('/fecthAll', officeController.fetchAllOffice);

// Find an office from the database
router.get('/fecth/:officeCode', officeController.findOffice);
                                                                        
// Add new office to the database
router.post('/add', officeController.addOffice);

// Update an office's details in the database
router.patch('/update/:officeCode', officeController.update);

// Delete an office details
router.delete('/delete/:officeCode', officeController.deleteOne);

module.exports = router;