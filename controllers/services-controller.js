const Services = require('../model/services');
const { validationResult } = require('express-validator');

// Add new service 
exports.addServices = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }
  Services.create({
    serviceName: req.body.serviceName,
    serviceDescription: req.body.serviceDescription
  })
    .then(result => {
      console.log(result);
      return res.status(200).send({ error: false, message: "Sucessfully created service", data: result });
    })
    .catch(err => {
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Fetch all available services
exports.fetchAllServices = (req, res, next) => {  
    Services.findAll()
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully fetched all services", data: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
  });
}

// Fetch a service
exports.findService = (req, res, next) => {
    Services.findByPk(req.params.serviceCode)
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully found service", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
}

// Update a service
exports.update = async (req, res, next) => {
    Services.findByPk(req.params.serviceCode)
    .then(service => {
        service.serviceName = req.body.serviceName,
        service.serviceDescription = req.body.serviceDescription
      return service.save();
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully updated service", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: true, message: "Database operation failed" });
    });
};

// Delete an employee
exports.deleteOne = async (req, res, next) => {
    Services.findByPk(req.params.serviceCode)
    .then(service => { 
      return service.destroy(); 
    })
    .then(result => {
      return res.status(200).send({ error: false, message: "Sucessfully deleted service"});
    })
    .catch(err => {
      console.log(err);
      return res.status(404).send({ error: true, message: 'Service not found' });
    });
}