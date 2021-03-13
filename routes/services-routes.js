const express = require('express');
const serviceController = require('../controllers/services-controller');
const { check, body } = require('express-validator');
const router = express.Router();

// Fetch all available services from the database
router.get('/fecthAll', serviceController.fetchAllServices);

// Find a service from the database
router.get('/fecthOne/:serviceCode', serviceController.findService);
                                                                        
// Add new service to the database
router.post('/add', serviceController.addServices);

// Update a service's details in the database
router.patch('/update/:serviceCode', serviceController.update);

// Delete a service 
router.delete('/delete/:serviceCode', serviceController.deleteOne);

module.exports = router;