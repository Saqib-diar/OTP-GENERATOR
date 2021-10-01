module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const { generateOtp, verifyOtp } = require('../Controllers/user.otp.controller')
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/", users.create);
  
    // Retrieve all users
    // router.get("/users/generateOTP", users.findAll);
    router.route('/generateOTP')
    .post(generateOtp);


    router.route('/verify')
    .post(verifyOtp);


    // Retrieve all published users
    router.get("/published", users.findAllPublished);
  
    // Retrieve a single user with id
    router.get("/:id", users.findOne);
  
    // Update a user with id
    router.put("/:id", users.update);
  
    // Delete a user with id
    router.delete("/:id", users.delete);
  
    // Delete all users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };