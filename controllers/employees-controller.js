const Employees = require('../model/employees');
const Office = require('../model/office');
const { validationResult } = require('express-validator');

// Add new office 
exports.addEmployee = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }
  Office.findByPk(req.body.officeCode)
    .then(result => {
      if(result){
        Employees.create({
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          officeCode: req.body.officeCode,
          nameExtension: req.body.nameExtension,
          email: req.body.email,
          jobTitle: req.body.jobTitle  
        })
          .then(result => {
            return res.status(200).send({ error: false, message: "Sucessfully created employee", data: result });
          })
          .catch(err => { 
            return res.status(500).send({ error: true, message: "Database operation failed" });
          });
      } else {
        return res.status(200).send({ error: false, message: "0ffice not available", data: result});
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Fetch all available employees
exports.fetchAllEmployee = (req, res, next) => {  
    Employees.findAll(/*{include: Office}*/)
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully fetched all employees", data: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
  });
}
 
// Fetch an employee
exports.findEmployee = (req, res, next) => {
    Employees.findByPk(req.params.employeeNumber)
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully found office", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Update an employee
exports.update = async (req, res, next) => {
  Office.findByPk(req.params.officeCode)
    .then(result => {
      if(result){
        Employees.findByPk(req.params.employeeNumber)
          .then(employee => {
            employee.lastName = req.body.lastName,
            employee.firstName = req.body.firstName,
            employee.nameExtension = req.body.nameExtension,
            employee.email = req.body.email,
            employee.jobTitle = req.body.jobTitle 
        return employee.save();
        })
        .then(result => {
          return res.status(200).send({ error: false, message: "Sucessfully updated employee", data: result});
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send({ error: true, message: "Database operation failed" });
        });
      } else {
        return res.status(200).send({ error: false, message: "0ffice not available", data: result});
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
    
};

// Delete an employee
exports.deleteOne = async (req, res, next) => {
    Employees.findByPk(req.params.employeeNumber)
    .then(employee => { 
      return employee.destroy(); 
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully deleted employee"});
    })
    .catch(err => {
      console.log(err);
      return res.status(404).send({ error: true, message: 'Emoloyee not found' });
    });
}