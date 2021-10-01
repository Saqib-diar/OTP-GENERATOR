const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "field can not be empty!"
      });
      return;
    }
  
    // Create a user
    const user = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      
    };
  
    // Save user in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  };

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  
};

// Find a single user with an id
exports.findOne = (req, res) => {
  
};

// Update a user by the id in the request
exports.update = (req, res) => {
  
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published users
exports.findAllPublished = (req, res) => {
  
};