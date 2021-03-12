const Office = require('../model/office');
const { validationResult } = require('express-validator');

// Add new office 
exports.addOffice = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }
  Office.create({
    city: req.body.city,
    phone: req.body.phone,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    country: req.body.country,
    state: req.body.state,
  })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully created office", data: result });
    })
    .catch(err => {
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Fetch all available offices
exports.fetchAllOffice = (req, res, next) => {  
  Office.findAll()
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully fetched all office", data: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
  });
}

// Fetch an office
exports.findOffice = (req, res, next) => {
  Office.findByPk(req.params.officeCode)
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully found office", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Update an office
exports.update = async (req, res, next) => {
  Office.findByPk(req.params.officeCode)
    .then(office => {
      office.city = req.body.city,
      office.phone = req.body.phone,
      office.addressLine1 = req.body.addressLine1,
      office.addressLine2 = req.body.addressLine2,
      office.country = req.body.country,
      office.state = req.body.state
      return office.save();
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully updated office", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
};

// Delete an employee
exports.deleteOne = async (req, res, next) => {
  Office.findByPk(req.params.officeCode)
    .then(office => { 
      return office.destroy(); 
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully deleted office"});
    })
    .catch(err => {
      console.log(err);
      return res.status(404).send({ error: true, message: 'Office not found' });
    });
}