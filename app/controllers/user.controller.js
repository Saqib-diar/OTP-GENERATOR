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
